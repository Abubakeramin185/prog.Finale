import mongoose from 'mongoose';

const FlightSchema = new mongoose.Schema({
  da: { type: String, required: true },
  a: { type: String, required: true },
  compagnia: { type: String, required: true },
  ora: { type: String, required: true },
  prezzo: { type: Number, required: true },
}, {
  timestamps: true
});

const flight = mongoose.model('Flight', FlightSchema);
export default flight;

