import express from 'express';
import multer from 'multer';
import { Desserts } from '../Model/Desserts.js';

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

// Route to fetch all dessert items
router.get('/desserts', async (req, res) => {
  try {
    const desserts = await Desserts.find({ category: 'dessert' }); // Fetch items where category is 'dessert'
    res.json(desserts);
  } catch (error) {
    console.error('Error fetching desserts:', error);
    res.status(500).json({ message: 'Failed to fetch dessert items' });
  }
});

// Admin-only route to add new dessert item
router.post('/adddesserts', upload.single('img'), async (req, res) => {
  const { name, price, available } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  const imgPath = req.file.path; // Get the uploaded image path

  try {
    const newDessert = new Desserts({ name, price, available, img: imgPath, category: 'dessert' });
    await newDessert.save();
    res.status(201).json({ message: 'Dessert item added successfully', dessert: newDessert });
  } catch (error) {
    console.error('Error adding dessert item:', error);
    res.status(500).json({ message: 'Failed to add dessert item' });
  }
});

export { router as DessertsRouter };
