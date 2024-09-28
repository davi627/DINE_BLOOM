import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Dessert schema
const dessertSchema = new Schema({
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
    enum: ['dessert'], // Ensures category is only 'dessert'
  },
});

// Create the Dessert model
const Desserts = mongoose.model('Desserts', dessertSchema);

export { Desserts };
