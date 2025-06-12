import express from 'express';
import Booking from '../models/bookingSchema.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// CREA una nuova prenotazione
router.post('/', verifyToken, async (req, res) => {
  try {
    const newBooking = new Booking({
      hotelId: req.body.hotelId,
      userId: req.body.userId,
      totalPrice: Number(req.body.totalPrice),
      checkIn: req.body.checkInDate,    // CORRETTO: corrisponde a schema.checkIn
      checkOut: req.body.checkOutDate,  // CORRETTO: corrisponde a schema.checkOut
      guests: req.body.guests
    });

    console.log("Richiesta ricevuta:", req.body);

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Errore nel salvataggio:", error);
    res.status(400).json({ error: 'Errore nella creazione della prenotazione' });
  }
});


// LEGGI tutte le prenotazioni
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', '-password') // Popola utente, escludi password
      .populate('hotelId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero delle prenotazioni' });
  }
});

// LEGGI una singola prenotazione per ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', '-password')
      .populate('hotelId');
    if (!booking) return res.status(404).json({ error: 'Prenotazione non trovata' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero della prenotazione' });
  }
});

// AGGIORNA una prenotazione
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) return res.status(404).json({ error: 'Prenotazione non trovata' });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: 'Errore durante l’aggiornamento' });
  }
});

// ELIMINA una prenotazione
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Prenotazione non trovata' });
    res.json({ message: 'Prenotazione eliminata con successo' });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l’eliminazione' });
  }
});

export default router;

