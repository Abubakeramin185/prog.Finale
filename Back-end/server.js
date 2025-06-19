import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import cors from 'cors';
import db from './db.js';
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
import Hotel from './models/hotelsSchema.js';
import routesFlights from './routes/routesFlights.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/images', express.static(path.join(process.cwd(), 'images')));

// DB connection
await db();

// Routes
app.use('/api/author', routerAuthenticators);
app.use('/api', uploadRouutes);
app.use('/api/hotels', routesHotels); // Nessun auth qui, solo nei singoli metodi del file
app.use('/api/users', routesUser);
app.use('/api/flights', routesFlights)
app.use('/api/bookings', authMiddleware, routesBookings);
app.use('/api', hotelsRoute);
app.use('/api', multre);

// GET hotel list (vero da MongoDB)
app.get('/api/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero hotel' });
  }
});

// GET singolo hotel
// app.get('/api/hotels/:id', async (req, res) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) return res.status(404).json({ error: "Hotel non trovato" });
//     res.json(hotel);
//   } catch (err) {
//     res.status(500).json({ error: 'Errore interno' });
//   }
// });

// START server
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));




export default app;



// import express from 'express';
// import mongoose from 'mongoose';
// import "dotenv/config";
// import cors from 'cors';
// import db from './db.js'
// import path from 'path';
// import { fileURLToPath } from 'url';



// import routesUser from './routes/routesUser.js';
// import routesHotels from './routes/routesHotels.js';
// import routesBookings from './routes/routesBooking.js';
// import routerAuthenticators from './routes/routerAuthenticators.js';
// import multre from './middleware/multer.js';
// import authMiddleware from './middleware/authMiddleware.js';
// import uploadRouutes from './routes/uploadRouutes.js';
// import hotelsRoute from './hotelRoutes/hotels.js';



// // import connectToDB from '../db.js'
// // import db from "../db.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const app = express();
// const PORT =3001;
// const dbname = "prog.finale";



// app.use(cors());
// app.use('/api/images', express.static(path.join(process.cwd(), 'images')));

// app.get('/api/hotels/:id', (req, res) => {
//   const hotel = hotels.find(h => h._id === req.params.id);
//   if (!hotel) return res.status(404).json({ error: "Not found" });
//   res.json(hotel);
// });

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')))



// app.use('/api/author', routerAuthenticators);
// app.use('/api', uploadRouutes);

// app.use('/api/hotels',  routesHotels);
// app.use('/api/bookings', authMiddleware, routesBookings);
// // app.use(authMiddleware); // middleware globale





// // Routes

// app.use('/api/users', routesUser);
// app.use('/api', hotelsRoute);
// app.use('/api', multre);

// // connectToDB();
//  db();

 
//  app.get('/api/hotels', (req, res) => {
//   res.json(hotels);
//   res.status(201).json({ message: "Utente registrato" });
// });
 


//  app.post("/api/auth/register", (req, res) => {
//   const { fullName, email, password } = req.body;
//   // salva nel database o fai altro
//   res.status(201).json({ message: "Utente registrato" });
// });


// // DB connection
//     app.listen(PORT, () => console.log('Server running on port ' + PORT));
  
  
