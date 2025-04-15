// pages/my-account.js
'use client'; // Ensure this is a client-side component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../components/myAccount.module.css';
import api from '../lib/api';


export default function MyAccount() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null); // Initialize as null
    const router = useRouter();

    useEffect(() => {
        // Access localStorage only on the client side
        const storedUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
        setUserId(storedUserId);

        const fetchOrders = async () => {
            if (!storedUserId) {
                router.push('/login'); // Safe to use router here within useEffect
                return;
            }
            try {
                const response = await api.get('/orders', { params: { customer: storedUserId } });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        if (activeTab === 'orders' && storedUserId) fetchOrders();
    }, [activeTab, router]);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userId');
        }
        router.push('/login'); // Safe to use router here within an event handler
    };

    // Move redirect logic inside useEffect to ensure client-side execution
    useEffect(() => {
        if (!userId) {
            router.push('/login');
        }
    }, [userId, router]);

    if (loading) return <div>Loading...</div>; // Show loading state while checking userId

    return (
        <div className={styles.myAccount}>
            <h1>My Account</h1>
            <div className={styles.tabs}>
                <button
                    className={activeTab === 'dashboard' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('dashboard')}
                >
                    Dashboard
                </button>
                <button
                    className={activeTab === 'orders' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
                <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <div className={styles.tabContent}>
                {activeTab === 'dashboard' && (
                    <div className={styles.dashboard}>
                        <h2>Welcome to Your Dashboard</h2>
                        <p>Here you can manage your account settings and view a summary of your activity.</p>
                        <p>Logged in as User ID: {userId}</p>
                    </div>
                )}
                {activeTab === 'orders' && (
                    <div className={styles.orders}>
                        <h2>My Orders</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : orders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            <ul className={styles.ordersList}>
                                {orders.map(order => (
                                    <li key={order.id} className={styles.orderItem}>
                                        <p>Order # {order.id} - {new Date(order.date_created).toLocaleDateString()}</p>
                                        <p>Status: {order.status}</p>
                                        <p>Total: ₹{parseFloat(order.total).toFixed(2)}</p>
                                        <ul>
                                            {order.line_items.map(item => (
                                                <li key={item.id}>{item.name} x {item.quantity} - ₹{parseFloat(item.total).toFixed(2)}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}