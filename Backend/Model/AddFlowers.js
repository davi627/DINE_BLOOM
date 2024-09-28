import mongoose from 'mongoose';

// Define the allowed categories using an enum
const categoriesEnum = ['flower', 'plant', 'herb']; // Add more categories as needed

const FlowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  img: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['flower'], // Enforcing the allowed categories
  },
});

const Flower = mongoose.model('Flower', FlowerSchema);

export { Flower };
