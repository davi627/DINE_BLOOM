import express from 'express';
import { initiateMpesaPayment, mpesaCallback } from '../Controllers/MpesaControllers.js';

const router = express.Router();

// Route to initiate MPESA checkout
router.post('/checkout', initiateMpesaPayment);

// Route to handle MPESA callback
router.post('/callback', mpesaCallback);

export default router;
