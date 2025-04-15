// components/Checkout.js
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../lib/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../lib/api';
import { loadStripe } from '@stripe/stripe-js';
import Script from 'next/script';
import styles from './checkout.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
    const { cart, clearCart } = useCart();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address_1: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        email: '',
        phone: '',
    });
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('razorpay');
    const [cardDetails, setCardDetails] = useState({ number: '', exp_month: '', exp_year: '', cvc: '' });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            setLoading(true);
            try {
                const response = await api.get('/payment_gateways');
                console.log('Fetched payment methods:', response.data);
                const enabledMethods = response.data.filter((method) => method.enabled);
                if (enabledMethods.length > 0) {
                    setPaymentMethods(enabledMethods);
                    if (!enabledMethods.some((method) => method.id === 'razorpay')) {
                        setSelectedPaymentMethod(enabledMethods[0].id);
                    }
                } else {
                    console.warn('No payment methods available');
                    setPaymentMethods([{ id: 'cod', title: 'Cash on Delivery' }]);
                    setSelectedPaymentMethod('cod');
                }
            } catch (error) {
                console.error('Error fetching payment methods:', error.response?.data || error.message);
                setPaymentMethods([{ id: 'cod', title: 'Cash on Delivery' }]);
                setSelectedPaymentMethod('cod');
            } finally {
                setLoading(false);
            }
        };
        fetchPaymentMethods();
    }, []);

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCardChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const createUser = async (email, firstName, lastName) => {
        try {
            const password = Math.random().toString(36).slice(-8); // Generate a random password
            const userData = {
                email,
                first_name: firstName,
                last_name: lastName,
                username: email.split('@')[0], // Use email prefix as username
                password,
                role: 'customer'
            };
            const response = await api.post('/customers', userData);
            console.log('User created successfully:', response.data);
            return { userId: response.data.id, password }; // Return user ID and password
        } catch (error) {
            console.error('Error creating user:', error.response?.data || error.message);
            throw error;
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedPaymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        if (!formData.first_name || !formData.email || !formData.phone || !total) {
            alert('Please fill in all required billing details.');
            return;
        }

        setIsSubmitting(true);

        try {
            if (selectedPaymentMethod === 'razorpay') {
                // Create Razorpay order manually
                const razorpayOrderResponse = await fetch('/api/create-razorpay-order-manual', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: total,
                        currency: 'INR',
                    }),
                });

                if (!razorpayOrderResponse.ok) {
                    const errorData = await razorpayOrderResponse.json();
                    throw new Error(errorData.message || 'Failed to create Razorpay order');
                }

                const { orderId, amount, currency } = await razorpayOrderResponse.json();

                // Initialize Razorpay checkout
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: amount * 100, // Convert to paise
                    currency,
                    order_id: orderId,
                    name: 'ECOM Fashion Tribe',
                    description: 'Order Payment',
                    handler: async function (response) {
                        try {
                            console.log('Razorpay payment success:', response);
                            const verifyResponse = await fetch('/api/verify-razorpay-payment', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature,
                                    wooCommerceOrderId: 'manual_order_' + Date.now(), // Placeholder
                                }),
                            });

                            if (!verifyResponse.ok) {
                                const errorData = await verifyResponse.json();
                                console.error('Verification failed:', errorData);
                                throw new Error(errorData.message || 'Payment verification failed');
                            }

                            // Create user if not exists
                            const userCheckResponse = await api.get('/customers', { params: { email: formData.email } });
                            let userId = null;
                            let password = null;
                            if (!userCheckResponse.data.length) {
                                const userResult = await createUser(formData.email, formData.first_name, formData.last_name);
                                userId = userResult.userId;
                                password = userResult.password;
                            } else {
                                userId = userCheckResponse.data[0].id;
                            }

                            const orderData = {
                                payment_method: 'razorpay',
                                payment_method_title: 'Razorpay',
                                set_paid: true,
                                billing: formData,
                                shipping: formData,
                                line_items: cart.map((item) => ({
                                    product_id: item.id,
                                    quantity: item.quantity,
                                })),
                                status: 'processing',
                                transaction_id: response.razorpay_payment_id,
                                customer_id: userId,
                            };

                            const wooResponse = await api.post('/orders', orderData);
                            clearCart();

                            // Notify user of credentials (in production, send via email)
                            if (password) {
                                alert(`Order placed successfully! Your account has been created. Username: ${formData.email}, Password: ${password}. Please log in to manage your orders.`);
                            } else {
                                alert('Order placed successfully! Please log in to manage your orders.');
                            }

                            router.push('/my-account');
                        } catch (error) {
                            console.error('Payment processing error:', error);
                            alert('Payment failed to process: ' + error.message);
                        }
                    },
                    prefill: {
                        name: `${formData.first_name} ${formData.last_name}`,
                        email: formData.email,
                        contact: formData.phone,
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };

                if (!window.Razorpay) {
                    throw new Error('Razorpay SDK not loaded');
                }

                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response) {
                    console.error('Payment failed:', response.error);
                    alert('Payment failed: ' + response.error.description);
                });
                rzp.open();
            } else if (selectedPaymentMethod === 'stripe') {
                // Existing Stripe logic
                const stripe = await stripePromise;
                const { token, error } = await stripe.createToken('card', {
                    number: cardDetails.number,
                    exp_month: cardDetails.exp_month,
                    exp_year: cardDetails.exp_year,
                    cvc: cardDetails.cvc,
                });

                if (error) throw new Error(error.message);
                if (!token) throw new Error('Stripe token creation failed');

                // Create user if not exists
                const userCheckResponse = await api.get('/customers', { params: { email: formData.email } });
                let userId = null;
                let password = null;
                if (!userCheckResponse.data.length) {
                    const userResult = await createUser(formData.email, formData.first_name, formData.last_name);
                    userId = userResult.userId;
                    password = userResult.password;
                } else {
                    userId = userCheckResponse.data[0].id;
                }

                const orderData = {
                    payment_method: 'stripe',
                    payment_method_title: 'Credit / Debit Card',
                    set_paid: true,
                    billing: formData,
                    shipping: formData,
                    line_items: cart.map((item) => ({
                        product_id: item.id,
                        quantity: item.quantity,
                    })),
                    status: 'processing',
                    stripe_token: token.id,
                    customer_id: userId,
                };

                const response = await api.post('/orders', orderData);
                clearCart();

                // Notify user of credentials (in production, send via email)
                if (password) {
                    alert(`Order placed successfully! Your account has been created. Username: ${formData.email}, Password: ${password}. Please log in to manage your orders.`);
                } else {
                    alert('Order placed successfully! Please log in to manage your orders.');
                }

                router.push('/my-account');
            } else if (selectedPaymentMethod === 'cod') {
                // Existing COD logic
                const userCheckResponse = await api.get('/customers', { params: { email: formData.email } });
                let userId = null;
                let password = null;
                if (!userCheckResponse.data.length) {
                    const userResult = await createUser(formData.email, formData.first_name, formData.last_name);
                    userId = userResult.userId;
                    password = userResult.password;
                } else {
                    userId = userCheckResponse.data[0].id;
                }

                const orderData = {
                    payment_method: 'cod',
                    payment_method_title: 'Cash on Delivery',
                    set_paid: false,
                    billing: formData,
                    shipping: formData,
                    line_items: cart.map((item) => ({
                        product_id: item.id,
                        quantity: item.quantity,
                    })),
                    status: 'pending',
                    customer_id: userId,
                };

                const response = await api.post('/orders', orderData);
                clearCart();

                // Notify user of credentials (in production, send via email)
                if (password) {
                    alert(`Order placed successfully! Your account has been created. Username: ${formData.email}, Password: ${password}. Please log in to manage your orders.`);
                } else {
                    alert('Order placed successfully! Please log in to manage your orders.');
                }

                router.push('/my-account');
            }
        } catch (error) {
            console.error('Error placing order:', error.response?.data || error.message);
            alert('Failed to place order. Please try again: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.checkout}>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <h1>Checkout</h1>
            <br />
            <div className={styles.checkoutFlex}>
                <div className={styles.checkoutFlexChild}>
                    <form>
                        <h4>Billing Details</h4>
                        <div className={styles.flexRow}>
                            <input
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input
                            name="address_1"
                            placeholder="Address"
                            value={formData.address_1}
                            onChange={handleChange}
                            required
                        />
                        <div className={styles.flexRow}>
                            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                            <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                        </div>
                        <div className={styles.flexRow}>
                            <input
                                name="postcode"
                                placeholder="Postcode"
                                value={formData.postcode}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </form>
                    <div className={styles.paymentMethods}>
                        <h4>Payment Method</h4>
                        {loading ? (
                            <p>Loading payment methods...</p>
                        ) : paymentMethods.length > 0 ? (
                            <>
                                {paymentMethods.find((method) => method.id === 'razorpay') && (
                                    <div key="razorpay" className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            id="razorpay"
                                            name="paymentMethod"
                                            value="razorpay"
                                            checked={selectedPaymentMethod === 'razorpay'}
                                            onChange={handlePaymentMethodChange}
                                            disabled={isSubmitting}
                                        />
                                        <label htmlFor="razorpay">Pay by Razorpay</label>
                                        {selectedPaymentMethod === 'razorpay' && (
                                            <button
                                                type="button"
                                                className={styles.payButton}
                                                onClick={handlePlaceOrder}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Processing...' : 'Pay Now'}
                                            </button>
                                        )}
                                    </div>
                                )}
                                {paymentMethods.find((method) => method.id === 'stripe') && (
                                    <div key="stripe" className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            id="stripe"
                                            name="paymentMethod"
                                            value="stripe"
                                            checked={selectedPaymentMethod === 'stripe'}
                                            onChange={handlePaymentMethodChange}
                                            disabled={isSubmitting}
                                        />
                                        <label htmlFor="stripe">Credit / Debit Card</label>
                                        {selectedPaymentMethod === 'stripe' && (
                                            <div className={styles.paymentForm}>
                                                <p>Test mode: Use test VISA card 4242424242424242 with any expiry date and CVC.</p>
                                                <input
                                                    name="number"
                                                    placeholder="Card Number"
                                                    value={cardDetails.number}
                                                    onChange={handleCardChange}
                                                    required
                                                />
                                                <input
                                                    name="exp_month"
                                                    placeholder="MM"
                                                    value={cardDetails.exp_month}
                                                    onChange={handleCardChange}
                                                    required
                                                />
                                                <input
                                                    name="exp_year"
                                                    placeholder="YY"
                                                    value={cardDetails.exp_year}
                                                    onChange={handleCardChange}
                                                    required
                                                />
                                                <input
                                                    name="cvc"
                                                    placeholder="CVC"
                                                    value={cardDetails.cvc}
                                                    onChange={handleCardChange}
                                                    required
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                                {paymentMethods.find((method) => method.id === 'cod') && (
                                    <div key="cod" className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            id="cod"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={selectedPaymentMethod === 'cod'}
                                            onChange={handlePaymentMethodChange}
                                            disabled={isSubmitting}
                                        />
                                        <label htmlFor="cod">Cash on Delivery</label>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p>No payment methods available. Defaulting to Cash on Delivery.</p>
                        )}
                    </div>
                </div>
                <div className={styles.orderSummary}>
                    <h2>Order Summary</h2>
                    <br />
                    <div className={styles.summaryDetails}>
                        {cart.map((item) => (
                            <p key={item.id}>
                                {item.name} x {item.quantity} - ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </p>
                        ))}
                        <p>Subtotal: ₹{total.toFixed(2)}</p>
                        <p>Total: ₹{total.toFixed(2)}</p>
                        {selectedPaymentMethod !== 'razorpay' && (
                            <button
                                className={styles.placeOrderButton}
                                onClick={handlePlaceOrder}
                                disabled={
                                    isSubmitting ||
                                    !formData.first_name ||
                                    !total ||
                                    (selectedPaymentMethod === 'stripe' &&
                                        (!cardDetails.number || !cardDetails.exp_month || !cardDetails.exp_year || !cardDetails.cvc))
                                }
                            >
                                {isSubmitting ? 'Processing...' : 'Place Order'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}