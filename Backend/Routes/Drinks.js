import express from 'express';
import multer from 'multer';
import { Drinks } from '../Model/Drinks.js';

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Ensure unique filename
  },
});

const upload = multer({ storage });

// Route to fetch all drink items
router.get('/drinks', async (req, res) => {
  try {
    const drinks = await Drinks.find({ category: 'drink' });
    res.status(200).json(drinks);
  } catch (error) {
    console.error('Error fetching drinks:', error);
    res.status(500).json({ message: 'Failed to fetch drink items' });
  }
});

// Admin-only route to add new drink item
router.post('/adddrinks', upload.single('img'), async (req, res) => {
  const { name, price, available } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  const imgPath = req.file.path; // Get the uploaded image path

  try {
    const newDrink = new Drinks({
      name,
      price,
      available: available === 'true', // Ensure 'available' is a boolean
      img: imgPath,
      category: 'drink',
    });
    await newDrink.save();
    res.status(201).json({ message: 'Drink item added successfully', drink: newDrink });
  } catch (error) {
    console.error('Error adding drink item:', error);
    res.status(500).json({ message: 'Failed to add drink item' });
  }
});
// Update drink availability
router.put('/drinks/:id', async (req, res) => {
  const { available } = req.body;
  try {
    const updatedDrink = await Drinks.findByIdAndUpdate(req.params.id, { available }, { new: true });
    res.status(200).json(updatedDrink);
  } catch (err) {
    console.error('Error updating drink availability:', err);
    res.status(500).json({ message: 'Failed to update drink availability' });
  }
});

// Delete drink item
router.delete('/drinks/:id', async (req, res) => {
  try {
    await Drinks.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Drink item deleted successfully' });
  } catch (err) {
    console.error('Error deleting drink item:', err);
    res.status(500).json({ message: 'Failed to delete drink item' });
  }
});


export { router as DrinksRouter };
