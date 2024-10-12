import express from 'express';
import multer from 'multer';
import { Food } from '../Model/AddFood.js'; // Adjust the path if necessary

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure that the 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Route to fetch all food items
router.get('/foods', async (req, res) => {
  try {
    const foods = await Food.find({ category: 'food' }); // Fetch items where category is 'food'
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Failed to fetch food items' });
  }
});

// Admin-only route to add new food item (with image upload)
router.post('/addfood', upload.single('img'), async (req, res) => {
  const { name, price, available } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  const imgPath = req.file.path; // Get the uploaded image path

  try {
    const newFood = new Food({ name, price, available, img: imgPath, category: 'food' });
    await newFood.save();
    res.status(201).json({ message: 'Food item added successfully', food: newFood });
  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).json({ message: 'Failed to add food item' });
  }
});
// Update food availability
router.put('/foods/:id', async (req, res) => {
  const { available } = req.body;
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, { available }, { new: true });
    res.status(200).json(updatedFood);
  } catch (err) {
    console.error('Error updating food availability:', err);
    res.status(500).json({ message: 'Failed to update food availability' });
  }
});

// Delete food item
router.delete('/foods/:id', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (err) {
    console.error('Error deleting food item:', err);
    res.status(500).json({ message: 'Failed to delete food item' });
  }
});


export { router as FoodRouter };
