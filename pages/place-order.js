// pages/place-order.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; // Add useState
import api from '../lib/api';
import Layout from '../components/Layout';

export default function PlaceOrder() {
    const router = useRouter();
    const { data } = router.query;
    const [hasPlacedOrder, setHasPlacedOrder] = useState(false); // Add flag to prevent duplicate orders

    useEffect(() => {
        if (!data || hasPlacedOrder) return; // Skip if no data or order already placed

        const { cart, billing } = JSON.parse(data);

        const orderData = {
            payment_method: 'cod',
            payment_method_title: 'Cash on Delivery',
            set_paid: false,
            billing,
            shipping: billing,
            line_items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            })),
            status: 'pending'
        };

        console.log('Order data being sent:', orderData);

        setHasPlacedOrder(true); // Set flag to prevent duplicate calls

        api.post('/orders', orderData)
            .then(response => {
                console.log('Order created successfully:', response.data);
                router.push(`/order-confirmation/${response.data.id}`);
            })
            .catch(error => {
                console.error('Error placing order:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                    headers: error.response?.headers
                });
                alert('Failed to place order. Please try again.');
                setHasPlacedOrder(false); // Allow retry if it fails
            });
    }, [data, router, hasPlacedOrder]);

    return (
        <Layout>
            <div>Placing your order...</div>
        </Layout>
    );
}