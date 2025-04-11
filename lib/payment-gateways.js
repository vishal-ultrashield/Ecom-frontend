// pages/api/payment-gateways.js
import api from '../../lib/api';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const response = await api.get('/payment_gateways'); // Correct WooCommerce endpoint
        const paymentGateways = response.data.filter(gateway => gateway.enabled); // Only enabled gateways
        res.status(200).json(paymentGateways);
    } catch (error) {
        console.error('Error fetching payment gateways:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to fetch payment gateways' });
    }
}