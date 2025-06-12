//users schema
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullname: {type:String, required: true},
  email: { type: String, required: true, unique: true },
  password:  {type:String, required: true},
  isAdmin: { type: Boolean, default: false }
});

export default mongoose.model('User', UserSchema);
