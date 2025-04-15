// pages/api/verify-razorpay-payment.js
import crypto from 'crypto';
import api from '../../lib/api';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, wooCommerceOrderId } = req.body;

    console.log('Verification request:', {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        wooCommerceOrderId,
    });

    try {
        const secret = process.env.RAZORPAY_KEY_SECRET;
        if (!secret) {
            throw new Error('Razorpay key secret not configured in .env.local');
        }

        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        console.log('Generated signature:', generatedSignature);
        console.log('Received signature:', razorpay_signature);

        if (generatedSignature !== razorpay_signature) {
            throw new Error('Invalid payment signature');
        }

        // Update WooCommerce order (optional, depending on your flow)
        if (wooCommerceOrderId && wooCommerceOrderId.startsWith('manual_order_')) {
            console.warn('Skipping WooCommerce order update for manual order ID:', wooCommerceOrderId);
        } else if (wooCommerceOrderId) {
            await api.put(`/orders/${wooCommerceOrderId}`, {
                status: 'processing',
                transaction_id: razorpay_payment_id,
            });
            console.log('WooCommerce order updated:', wooCommerceOrderId);
        } else {
            console.warn('No valid wooCommerceOrderId provided');
        }

        res.status(200).json({ message: 'Payment verified successfully' });
    } catch (error) {
        console.error('Verification error:', {
            message: error.message,
            stack: error.stack,
        });
        res.status(400).json({ message: 'Payment verification failed', error: error.message });
    }
}