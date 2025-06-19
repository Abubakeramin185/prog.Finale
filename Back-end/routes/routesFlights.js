// routes/routesFlights.js
// import express from 'express';
// import flight from './models/FlightSchema.js';

// const router = express.Router();

// Dati mock per esempio
// const voliFinti = [
//   {
//     id: 1,
//     da: 'Roma',
//     a: 'Londra',
//     prezzo: 120,
//     compagnia: 'Ryanair',
//     ora: '10:00'
//   },
//   {
//     id: 2,
//     da: 'Milano',
//     a: 'Parigi',
//     prezzo: 150,
//     compagnia: 'EasyJet',
//     ora: '14:30'
//   }
// ];

// // GET /api/flights
// router.get('/', (req, res) => {
//   res.json(voliFinti);
// });

// export default router;

import express from 'express';
import Flight from '../models/flightSchema.js';

const router = express.Router();

// GET /api/flights → tutti i voli
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dei voli' });
  }
});

// POST /api/flights → crea un nuovo volo
router.post('/', async (req, res) => {
  try {
    const { da, a, compagnia, ora, prezzo } = req.body;

    if (!da || !a || !compagnia || !ora || !prezzo) {
      return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
    }

    const newFlight = new Flight({ da, a, compagnia, ora, prezzo });
    await newFlight.save();

    res.status(201).json(newFlight);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella creazione del volo' });
  }
});

export default router;


