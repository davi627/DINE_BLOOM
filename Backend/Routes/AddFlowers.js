import express from 'express';
import multer from 'multer';
import { Flower } from '../Model/AddFlowers.js'; // Adjust the import path if necessary

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

// Route to fetch all flower items
router.get('/flowers', async (req, res) => {
  try {
    const flowers = await Flower.find({}); // Fetch all flower items
    res.json(flowers);
  } catch (error) {
    console.error('Error fetching flowers:', error);
    res.status(500).json({ message: 'Failed to fetch flower items' });
  }
});

// Admin-only route to add new flower item
router.post('/addflowers', upload.single('img'), async (req, res) => {
  const { name, price, available } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  const imgPath = req.file.path; // Get the uploaded image path

  try {
    const newFlower = new Flower({ name, price, available, img: imgPath });
    await newFlower.save();
    res.status(201).json({ message: 'Flower item added successfully', flower: newFlower });
  } catch (error) {
    console.error('Error adding flower item:', error);
    res.status(500).json({ message: 'Failed to add flower item' });
  }
});

// Route to update flower availability
router.put('/flowers/:id', async (req, res) => {
  const { id } = req.params;
  const { available } = req.body;

  try {
    const updatedFlower = await Flower.findByIdAndUpdate(
      id,
      { available },
      { new: true } // Return the updated document
    );

    if (!updatedFlower) {
      return res.status(404).json({ message: 'Flower not found' });
    }

    res.json({ message: 'Flower availability updated', flower: updatedFlower });
  } catch (error) {
    console.error('Error updating flower availability:', error);
    res.status(500).json({ message: 'Failed to update flower availability' });
  }
});

// Route to delete flower item
router.delete('/flowers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFlower = await Flower.findByIdAndDelete(id);

    if (!deletedFlower) {
      return res.status(404).json({ message: 'Flower not found' });
    }

    res.json({ message: 'Flower deleted successfully' });
  } catch (error) {
    console.error('Error deleting flower item:', error);
    res.status(500).json({ message: 'Failed to delete flower item' });
  }
});

export { router as FlowerRouter };
