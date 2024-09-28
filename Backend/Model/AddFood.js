import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Food schema
const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['food'], // Ensures category is only 'food'
  },
});

// Create the Food model
const Food = mongoose.model('Food', foodSchema);

export { Food };
