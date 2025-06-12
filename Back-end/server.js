//server.js
import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import cors from 'cors';
import db from './db.js'
import path from 'path';
import { fileURLToPath } from 'url';



import routesUser from './routes/routesUser.js';
import routesHotels from './routes/routesHotels.js';
import routesBookings from './routes/routesBooking.js';
import routerAuthenticators from './routes/routerAuthenticators.js';
import multre from './middleware/multer.js';
import authMiddleware from './middleware/authMiddleware.js';
import uploadRouutes from './routes/uploadRouutes.js';
import hotelsRoute from './hotelRoutes/hotels.js';









// import connectToDB from '../db.js'
// import db from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT =3001;
const dbname = "prog.finale";



app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use('/api/author', routerAuthenticators);
app.use('/api', uploadRouutes);
app.use('/api/hotels', routesHotels);
app.use(authMiddleware); // middleware globale
app.use('/api', hotelsRoute);




// Routes

app.use('/api/users', routesUser);
app.use('/api/bookings', routesBookings); 
app.use('/api', multre);

// connectToDB();
 db();

 const hotels = [
  {
    id: 1,
    name: 'Hotel Roma',
    image: 'Madagascar.jpg',
    location: 'Roma',
    price: 100,
    rating: 4.5,
  },
];
 app.get('/api/hotels', (req, res) => {
  res.json(hotels);
  res.status(201).json({ message: "Utente registrato" });
});
 


 app.post("/api/auth/register", (req, res) => {
  const { fullName, email, password } = req.body;
  // salva nel database o fai altro
  res.status(201).json({ message: "Utente registrato" });
});

// DB connection
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
  
  
