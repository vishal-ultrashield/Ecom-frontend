// components/ProductDetails.js
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../lib/CartContext';
import styles from './productDetails.module.css';

export default function ProductDetails({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = useCallback((e) => {
        e.preventDefault(); // Prevent any form submission or bubbling
        e.stopPropagation(); // Stop event from bubbling up to parent elements

        console.log('Add to Cart button clicked'); // Debug log

        if (isAdding) {
            console.log('Add to Cart aborted: already adding'); // Debug log
            return;
        }

        setIsAdding(true);

        console.log('Adding to cart:', { product, quantity });
        addToCart({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: product.images[0]?.src,
        }, quantity);
        console.log('Cart should be updated now');
        alert(`${product.name} has been added to your cart!`);

        router.push('/cart').finally(() => {
            setIsAdding(false);
            console.log('Navigation complete, isAdding reset'); // Debug log
        });
    }, [isAdding, product, quantity, addToCart, router]);

    return (
        <div className={styles.productDetails}>
            <h1>{product.name}</h1>
            <img src={product.images[0]?.src} alt={product.name} className={styles.productImage} />
            <p className={styles.price}>₹{parseFloat(product.price).toFixed(2)}</p>
            {product.sale_price && (
                <p className={styles.oldPrice}>
                    MRP ₹{parseFloat(product.regular_price).toFixed(2)} ({Math.round(((product.regular_price - product.price) / product.regular_price) * 100)}% OFF)
                </p>
            )}
            <div>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className={styles.quantityInput}
                />
                <button
                    onClick={handleAddToCart}
                    className={styles.addToCartButton}
                    disabled={isAdding}
                >
                    {isAdding ? 'Adding...' : 'Add to Cart'}
                </button>
            </div>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.description }} />
            <p>Category: {product.categories[0]?.name}</p>
            <p>Brand: {product.brands[0]?.name || 'N/A'}</p>
        </div>
    );
}