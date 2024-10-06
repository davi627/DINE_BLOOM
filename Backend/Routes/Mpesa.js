import express from 'express';
import axios from 'axios';

const router = express.Router();

// M-Pesa API credentials
const consumerKey = '8Zd7oeZfP73tszseIOdo5ytsB1T2FWEAVsA3MNpLoomzb5Ut'
const consumerSecret = 'lVzpwdcp9zkII2gAoE14c45AT9GQsAv28VlmKhD07gdIL3m72zurPw1KJp6yS2vg'
const shortcode = '174379';
const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

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
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting OAuth token:', error);
    throw error;
  }
};

// STK Push API
router.post('/stkpush', async (req, res) => {
  try {
    const { amount, phoneNumber } = req.body;
    const token = await getOAuthToken();
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
      AccountReference: 'Job Payment',
      TransactionDesc: 'Payment for the order',
    };

    const response = await axios.post(stkPushUrl, requestBody, {
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error initiating STK Push:', error);
    res.status(500).json({ error: 'Failed to initiate STK Push' });
  }
});

export default router;