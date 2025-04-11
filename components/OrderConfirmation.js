import styles from './orderConfirmation.module.css';
import Link from 'next/link';

export default function OrderConfirmation({ order }) {
    return (
        <div className={styles.orderConfirmation}>
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
            <p>Order Number: {order.id}</p>
            <p>Total: ₹{order.total}</p>
            <p>Status: {order.status}</p>
            <h2>Items</h2>
            {order.line_items.map(item => (
                <p key={item.id}>{item.name} x {item.quantity} - ₹{item.total}</p>
            ))}
            <Link href="/">Continue Shopping</Link>
        </div>
    );
}