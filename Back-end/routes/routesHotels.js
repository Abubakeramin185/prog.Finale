import express from 'express';
import Hotel from '../models/hotelsSchema.js';
import upload from './utils/upload.js'
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

// Ottieni tutti gli hotel
router.get('/hotels', async (req, res) => {
  try {
    const file = await fs.readFile(path.resolve('data/hotels.json'), 'utf-8');
    const hotels = JSON.parse(file);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel caricamento hotel' });
  }
});
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero degli hotel' });
  }
});

// Ottieni un hotel per ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Hotel non trovato' });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dell’hotel' });
  }
});



// Crea un nuovo hotel
router.post('/', async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Errore nella creazione dell’hotel' });
  }
 });

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      city,
      address,
      distance,
      price,
      description,
      rating
    } = req.body;

    const imageUrl = req.file?.path; // immagine Cloudinary

    const newHotel = new Hotel({
      name,
      city,
      address,
      distance,
      price,
      description,
      rating,
      image: imageUrl, // salva come stringa, non array
      rooms: [] // oppure aggiungi room IDs se ne hai
    });

    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella creazione dell’hotel' });
  }
});


//  router.post('/create', upload.single('imageURL12'), async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const imageUrl = req.file?.path; // <-- Cloudinary image URL

//     const newHotel = new Hotel({
//       name,
//       description,
//       image: imageUrl,
//     });

//     await newHotel.save();
//     res.status(201).json(newHotel);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Errore nella creazione dell’hotel con immagine' });
//   }
// });
// Aggiorna un hotel per ID
router.put('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hotel) return res.status(404).json({ error: 'Hotel non trovato' });
    res.json(hotel);
  } catch (error) {
    res.status(400).json({ error: 'Errore durante l’aggiornamento' });
  }
});

// Elimina un hotel per ID
router.delete('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Hotel non trovato' });
    res.json({ message: 'Hotel eliminato con successo' });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l’eliminazione' });
  }
});

export default router;

