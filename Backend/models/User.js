import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String, // demo only
  role: { type: String, enum: ['admin', 'employee'] }
});

export default mongoose.model('User', userSchema);
