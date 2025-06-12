import mongoose from "mongoose";
import "dotenv/config";

{
  "hotels" [
    { "id": 1, "name": "Hotel Roma", "city": "Roma", "price": 120 },
    { "id": 2, "name": "Hotel Milano", "city": "Milano", "price": 95 }
  ],
  "bookings" [
    { "id": 1, "hotel": "Hotel Roma", "date": "2025-06-01", "price": 100 }
  ]
}

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL,);
            console.log(' mongoDB connected')
        }catch (error){
            console.error('mongoDB connection error:', error)
          
    }
}
export default connectDB
