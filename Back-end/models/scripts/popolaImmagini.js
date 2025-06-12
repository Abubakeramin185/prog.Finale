// scripts/popolaImmagini.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Hotel from "../models/Hotel.js"; // ✅ IMPORT CORRETTO!

dotenv.config();
PORT= 3001;

const IMMAGINI_CASUALI = [
  "https://res.cloudinary.com/dpu8bawhs/image/upload/v1749309637/cloud-upload/1749309636675-702016306-hotelf.jpg.png",
  "https://source.unsplash.com/800x600/?resort",
  "https://source.unsplash.com/800x600/?room",
  "https://source.unsplash.com/800x600/?beach+hotel",
  "https://source.unsplash.com/800x600/?luxury+hotel"
];

async function aggiungiImmagini() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const hotels = await Hotel.find({});

    for (let hotel of hotels) {
      const randomImg = IMMAGINI_CASUALI[Math.floor(Math.random() * IMMAGINI_CASUALI.length)];
      hotel.image = [randomImg]; //  Assegna immagine random
      await hotel.save();
      console.log(` Aggiornato: ${hotel.name} → ${hotel.image[0]}`);
    }

    console.log("✔️ Completato.");
    await mongoose.disconnect();
  } catch (err) {
    console.error(" Errore:", err);
  }
}

aggiungiImmagini();

