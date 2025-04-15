// pages/api/create-razorpay-order-manual.js
import Razorpay from 'razorpay';
import api from '../../lib/api';

const razorpayInstance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET, // Add to .env.local
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { amount, currency = 'INR', receipt = 'order_rcptid_' + Date.now() } = req.body;

    try {
        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt,
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ orderId: order.id, amount, currency });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: 'Failed to create Razorpay order', error: error.message });
    }
}