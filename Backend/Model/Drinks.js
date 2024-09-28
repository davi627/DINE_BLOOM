import mongoose from 'mongoose';

const drinksSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true },
  img: { type: String, required: true }, // Path to the uploaded image
  category: { type: String, default: 'drink' },
});

const Drinks = mongoose.model('Drinks', drinksSchema);

export { Drinks };
