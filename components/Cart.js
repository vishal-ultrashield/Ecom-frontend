import { useCart } from '../lib/CartContext';
import Link from 'next/link';
import styles from './cart.module.css';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, isLoaded } = useCart();
    console.log('Current cart state in Cart component:', cart);

    if (!isLoaded) {
        return <div>Loading cart...</div>;
    }

    if (cart.length === 0) {
        return <div className={styles.empty}>Your cart is empty. <Link href="/">Shop now</Link></div>;
    }

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    return (
        <div className={styles.cart}>
            <h1>Your Cart</h1><br></br>
            {cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                    <div className={styles.itemDetails}>
                        <h3>{item.name}</h3>
                        <p>Price: ₹{item.price} x {item.quantity} = ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className={styles.quantityInput}
                        />
                        <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <div className={styles.total}>
                <p>Total: ₹{total.toFixed(2)}</p>
                <Link href="/checkout">
                    <button className={styles.checkoutButton}>Proceed to Checkout</button>
                </Link>
            </div>
        </div>
    );
}