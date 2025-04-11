import { useState, useEffect } from 'react';
import { useCart } from '../lib/CartContext';
import Link from 'next/link';
import styles from './checkout.module.css';
import { useRouter } from 'next/router';
import api from '../lib/api';
import { loadStripe } from '@stripe/stripe-js';
import Razorpay from 'razorpay';

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
        phone: ''
    });
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('razorpay');
    const [cardDetails, setCardDetails] = useState({ number: '', exp_month: '', exp_year: '', cvc: '' });
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            setLoading(true);
            try {
                const response = await api.get('/payment_gateways');
                console.log('Fetched payment methods response:', response.data);
                if (response.data && Array.isArray(response.data)) {
                    setPaymentMethods(response.data);
                    if (response.data.length > 0 && !response.data.some(method => method.id === 'razorpay')) {
                        setSelectedPaymentMethod(response.data[0].id);
                    }
                } else {
                    console.warn('No payment methods available from API');
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

    const handlePlaceOrder = async () => {
        if (!selectedPaymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        setIsSubmitting(true);

        const orderData = {
            payment_method: selectedPaymentMethod,
            payment_method_title: paymentMethods.find(method => method.id === selectedPaymentMethod)?.title || 'Unknown',
            set_paid: selectedPaymentMethod === 'cod' ? false : true,
            billing: formData,
            shipping: formData,
            line_items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            })),
            status: 'pending'
        };

        try {
            let paymentResponse = null;
            if (selectedPaymentMethod === 'stripe') {
                const stripe = await stripePromise;
                const { token, error } = await stripe.createToken('card', {
                    number: cardDetails.number,
                    exp_month: cardDetails.exp_month,
                    exp_year: cardDetails.exp_year,
                    cvc: cardDetails.cvc,
                });
                if (error) throw new Error(error.message);
                if (!token) throw new Error('Stripe token creation failed');
                orderData.stripe_token = token.id;
                paymentResponse = { id: token.id };
            } else if (selectedPaymentMethod === 'razorpay') {
                const razorpay = new Razorpay({
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Include Razorpay key_id
                    amount: total * 100, // Amount in paise
                    currency: 'INR',
                    name: 'Your Store',
                    description: 'Order Payment',
                    handler: function (response) {
                        paymentResponse = response;
                    },
                    prefill: {
                        name: `${formData.first_name} ${formData.last_name}`,
                        email: formData.email,
                        contact: formData.phone
                    },
                    notes: {
                        order_id: 'order_' + Math.random().toString(36).substr(2, 9)
                    },
                    theme: {
                        color: '#3399cc'
                    }
                });
                razorpay.open();
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for popup response
                if (!paymentResponse) throw new Error('Razorpay payment failed or cancelled');
                orderData.razorpay_payment_id = paymentResponse.razorpay_payment_id;
                orderData.key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID; // Add key_id for Razorpay
            }

            const response = await api.post('/orders', orderData);
            console.log('Order created successfully:', response.data);
            clearCart();
            router.push(`/order-confirmation/${response.data.id}`);
        } catch (error) {
            console.error('Error placing order:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            alert('Failed to place order. Please try again: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.checkout}>
            <h1>Checkout</h1><br></br>
            <div className={styles.checkoutFlex}>
                <div className={styles.checkoutFlexChild}>
                    <form>
                        <h4>Billing Details</h4>
                        <div className={styles.flexRow}>
                            <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
                            <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
                        </div>
                        <input name="address_1" placeholder="Address" value={formData.address_1} onChange={handleChange} required />
                        <div className={styles.flexRow}>
                            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                            <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                        </div>
                        <div className={styles.flexRow}>
                            <input name="postcode" placeholder="Postcode" value={formData.postcode} onChange={handleChange} required />
                            <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
                        </div>
                        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                    </form>
                    <div className={styles.paymentMethods}>
                        <h4>Payment Method</h4>
                        {loading ? (
                            <p>Loading payment methods...</p>
                        ) : paymentMethods.length > 0 ? (
                            <>
                                {paymentMethods.find(method => method.id === 'razorpay') && (
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
                                {paymentMethods.find(method => method.id === 'stripe') && (
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
                                {paymentMethods.find(method => method.id === 'cod') && (
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
                    <h2>Order Summary</h2><br></br>
                    <div className={styles.summaryDetails}>
                        {cart.map(item => (
                            <p key={item.id}>{item.name} x {item.quantity} - ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                        ))}
                        <p>Subtotal: ₹{total.toFixed(2)}</p>
                        <p>Total: ₹{total.toFixed(2)}</p>
                        {selectedPaymentMethod !== 'razorpay' && (
                            <button
                                className={styles.placeOrderButton}
                                onClick={handlePlaceOrder}
                                disabled={isSubmitting || !formData.first_name || !total || (selectedPaymentMethod === 'stripe' && (!cardDetails.number || !cardDetails.exp_month || !cardDetails.exp_year || !cardDetails.cvc))}
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