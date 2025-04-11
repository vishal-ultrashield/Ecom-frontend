// components/Layout.js
import Header from './header';
import Footer from './footer';
import Navigation from './navigation';
import { CartProvider, useCart } from '../lib/CartContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './layout.module.css';

function LayoutContent({ children }) {
    const router = useRouter();
    const { cart, isLoaded } = useCart();

    const isProductPage = router.pathname.startsWith('/product');
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0); // Calculate total quantity
    const hasItemsInCart = totalQuantity > 0;

    return (
        <div>
            <Header />
            {isProductPage && isLoaded && hasItemsInCart && (
                <div className={styles.cartSection}>
                    <p>You have {totalQuantity} item{totalQuantity > 1 ? 's' : ''} in your cart.</p>
                    <Link href="/cart">
                        <button className={styles.viewCartButton}>View Cart</button>
                    </Link>
                </div>
            )}
            {children}
            <Footer />
        </div>
    );
}

export default function Layout({ children }) {
    return (
        <CartProvider>
            <LayoutContent>{children}</LayoutContent>
        </CartProvider>
    );
}