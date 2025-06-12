import express from 'express';
import fs from 'fs/promises';
import path from 'path'; 


const router = express.Router();



router.get('/hotels', async (req, res) => {
  try {
    const file = await fs.readFile(path.resolve('data/hotels.json'), 'utf-8');
    const hotels = JSON.parse(file);
    res.json(hotels);
  } catch (error) {
    console.error('Errore nella lettura JSON:', error);
    res.status(500).json({ error: 'Errore nel caricamento degli hotel' });
  }
});

export default router;

