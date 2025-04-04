// components/Checkout.js
import { useState } from 'react';
import { useCart } from '../lib/CartContext';
import Link from 'next/link';
import styles from './checkout.module.css';

export default function Checkout() {
    const { cart } = useCart();
    const [formData, setFormData] = useState({
        first_name: '', // Changed to match WooCommerce API
        last_name: '',
        address_1: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        email: '',
        phone: ''
    });

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.checkout}>
            <h1>Checkout</h1>
            <form>
                <h2>Billing Details</h2>
                <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
                <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
                <input name="address_1" placeholder="Address" value={formData.address_1} onChange={handleChange} required />
                <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                <input name="postcode" placeholder="Postcode" value={formData.postcode} onChange={handleChange} required />
                <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            </form>
            <div className={styles.orderSummary}>
                <h2>Order Summary</h2>
                {cart.map(item => (
                    <p key={item.id}>{item.name} x {item.quantity} - ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                ))}
                <p>Total: ₹{total.toFixed(2)}</p>
                <Link href={{ pathname: '/place-order', query: { data: JSON.stringify({ cart, billing: formData }) } }}>
                    <button className={styles.placeOrderButton}>Place Order</button>
                </Link>
            </div>
        </div>
    );
}