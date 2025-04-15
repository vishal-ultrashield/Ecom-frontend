// pages/api/create-razorpay-order.js
import api from '../../lib/api';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { cart, billing, shipping } = req.body;

    try {
        const orderData = {
            payment_method: 'razorpay',
            payment_method_title: 'Razorpay',
            set_paid: false,
            billing,
            shipping,
            line_items: cart.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
            })),
            status: 'pending',
        };

        // Create WooCommerce order
        const response = await api.post('/orders', orderData);
        const order = response.data;

        console.log('WooCommerce order created:', order);

        // Fetch Razorpay order_id from order meta_data
        const razorpayOrderId = order.meta_data.find((meta) => meta.key === '_razorpay_order_id')?.value;

        if (!razorpayOrderId) {
            console.error('Razorpay order ID not found in meta_data:', order.meta_data);
            throw new Error('Razorpay order ID not found. Check WooCommerce Razorpay plugin configuration.');
        }

        res.status(200).json({
            orderId: razorpayOrderId,
            amount: parseFloat(order.total),
            currency: order.currency,
            wooCommerceOrderId: order.id,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
}