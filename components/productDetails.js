// components/ProductDetails.js
import styles from './productDetails.module.css';

export default function ProductDetails({ product }) {
    return (
        <div className={styles.productDetails}>
            <h1>{product.name}</h1>
            <img src={product.images[0]?.src} alt={product.name} className={styles.productImage} />
            <p className={styles.price}>₹{product.price}</p>
            {product.sale_price && (
                <p className={styles.oldPrice}>
                    MRP ₹{product.regular_price} ({Math.round(((product.regular_price - product.price) / product.regular_price) * 100)}% OFF)
                </p>
            )}
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.description }} />
            <p>Category: {product.categories[0]?.name}</p>
            <p>Brand: {product.brands[0]?.name}</p>
            {/* Add more details like tags, stock status, etc. */}
        </div>
    );
}