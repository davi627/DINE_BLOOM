import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  mpesaNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending', // can be 'pending', 'completed', 'failed'
  },
  transactionId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Payment', paymentSchema);






