// routes/admin.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../Model/Admin.js'; 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET ||"jwttokenkey"

// Predefined admin credentials
const predefinedAdmin = {
  email: 'apollobinary1@gmail.com',  
  password: 'admin1234'        
};

// Function to create the predefined admin if not already created
const createPredefinedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: predefinedAdmin.email });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(predefinedAdmin.password, 10);
      const newAdmin = new Admin({
        email: predefinedAdmin.email,
        password: hashedPassword
      });
      await newAdmin.save();
      console.log('Predefined admin created.');
    } else {
      console.log('Admin already exists.');
    }
  } catch (err) {
    console.error('Error creating predefined admin:', err);
  }
};

// Call the function on server startup
createPredefinedAdmin();

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: admin.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, message: 'Login successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export {router as AdminRouter};
