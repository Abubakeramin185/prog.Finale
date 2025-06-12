// models/Hotel.js
import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  distance: { type: String, requiresd: true },
  price: { type: Number, required: true },
  image: { 
    type: [String], 
    default: [] },
  description: { type: String, required: true },
  rooms: { type: [String], default: [] }
}, { timestamps: true });

const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;

