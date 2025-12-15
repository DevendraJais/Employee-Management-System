import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    age: Number,
    class: { type: String, index: true },
    subjects: [String],
    attendance: { type: Number, index: true },
    flagged: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);
