import axios from 'axios';
import Payment from '../Model/Mpesa.js';
import dotenv from 'dotenv';

dotenv.config();

// Generate MPESA Access Token
const getMpesaAccessToken = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  try {
    const { data } = await axios.get(`${process.env.MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

// Initiate MPESA STK Push Payment
export const initiateMpesaPayment = async (req, res) => {
  const { mpesaNumber, amount } = req.body;

  if (!mpesaNumber || !amount) {
    return res.status(400).json({ message: 'MPESA number and amount are required' });
  }

  const token = await getMpesaAccessToken();
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

  // Default account number to be used for the payment
  const accountNumber = process.env.DEFAULT_ACCOUNT_NUMBER || '12345'; // Replace with your actual default account number

  const requestBody = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: mpesaNumber, // Customer's phone number
    PartyB: shortcode, // Paybill number
    PhoneNumber: mpesaNumber,
    CallBackURL: `${process.env.CALLBACK_URL}/mpesa/callback`,
    AccountReference: accountNumber, // Using the default account number
    TransactionDesc: 'Payment for food order',
  };

  try {
    const paymentResponse = await axios.post(`${process.env.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Save the payment in the database
    const payment = new Payment({
      mpesaNumber,
      amount,
      status: 'pending',
    });
    await payment.save();

    res.status(200).json({ message: 'Payment initiated. Please check your phone.', data: paymentResponse.data });
  } catch (error) {
    console.error('Error initiating payment:', error.response?.data || error.message);
    res.status(500).json({ message: 'Payment initiation failed', error: error.message });
  }
};

// Handle MPESA payment callback
export const mpesaCallback = async (req, res) => {
  const { Body } = req.body;

  if (!Body) {
    return res.status(400).json({ message: 'Invalid callback data' });
  }

  const { ResultCode, ResultDesc, CallbackMetadata } = Body.stkCallback;

  try {
    if (ResultCode === 0) {
      const transactionId = CallbackMetadata?.Item.find((i) => i.Name === 'MpesaReceiptNumber')?.Value;
      const mpesaNumber = CallbackMetadata?.Item.find((i) => i.Name === 'PhoneNumber')?.Value;
      const amount = CallbackMetadata?.Item.find((i) => i.Name === 'Amount')?.Value;

      // Update payment record in the database
      await Payment.findOneAndUpdate(
        { mpesaNumber, amount },
        { status: 'completed', transactionId },
        { new: true }
      );
    } else {
      console.log('Payment failed:', ResultDesc);
    }

    res.status(200).json({ message: 'Callback received' });
  } catch (error) {
    console.error('Error handling callback:', error);
    res.status(500).json({ message: 'Failed to process callback' });
  }
};
