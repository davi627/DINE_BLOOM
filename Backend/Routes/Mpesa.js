import express from 'express';
import axios from 'axios';

const router = express.Router();

// M-Pesa API credentials
const consumerKey = 'NXxDrUJLAUhaHcIjQGwGXSfyuQrAqc7L4OPsQaUnTVhKJ32B'
const consumerSecret = '1CRQ4sIUjXQI6AIuTuoadkbhAa7JfJmda1u48xwPWZVvCUw0K74ucjW634dB7s1A'
const shortcode = '174379';
const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

// Declare a default account number for testing
const defaultAccountNumber = 'TEST001';

// M-Pesa API endpoints
const oauthTokenUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
const stkPushUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

// Get OAuth token
const getOAuthToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  try {
    const response = await axios.get(oauthTokenUrl, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });
    console.log('OAuth Token Response:', response.data);
    if (response.data && response.data.access_token) {
      return response.data.access_token;
    } else {
      throw new Error('Access token not found in the response');
    }
  } catch (error) {
    console.error('Error getting OAuth token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// STK Push API
router.post('/stkpush', async (req, res) => {
  try {
    const { amount, phoneNumber, accountNumber = defaultAccountNumber } = req.body;
    const token = await getOAuthToken();
    if (!token) {
      throw new Error('Failed to obtain OAuth token');
    }
    console.log('OAuth Token:', token);

    const auth = `Bearer ${token}`;
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const requestBody = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: 'https://your-callback-url.com/callback',
      AccountReference: accountNumber,
      TransactionDesc: 'Payment for the order to Dine and Bloom',
    };

    console.log('STK Push Request Body:', requestBody);

    const response = await axios.post(stkPushUrl, requestBody, {
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
      },
    });

    console.log('STK Push Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error initiating STK Push:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to initiate STK Push', details: error.message });
  }
});

export default router;