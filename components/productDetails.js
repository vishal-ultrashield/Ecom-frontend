// components/ProductDetails.js
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../lib/CartContext';
import styles from './productDetails.module.css';

export default function ProductDetails({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('description'); // State for active tab
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('Add to Cart button clicked');

        if (isAdding) {
            console.log('Add to Cart aborted: already adding');
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
            console.log('Navigation complete, isAdding reset');
        });
    }, [isAdding, product, quantity, addToCart, router]);

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    // Ensure images array is valid
    const images = product.images && product.images.length > 0 ? product.images : [{ src: '/placeholder-image.jpg' }];

    // Function to render star rating
    const renderStars = (rating) => {
        const maxStars = 5;
        const filledStars = Math.round(parseFloat(rating) || 0);
        const stars = [];

        for (let i = 0; i < maxStars; i++) {
            stars.push(
                <span
                    key={i}
                    className={`${styles.star} ${i < filledStars ? styles.filledStar : ''}`}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    // Tab content rendering
    const renderTabContent = () => {
        switch (activeTab) {
            case 'description':
                return (
                    <div className={styles.tabContent}>
                        <h3>Description</h3>
                        <div dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }} />
                    </div>
                );
            case 'specifications':
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.tabChild}>
                            <div>
                                <div className={styles.tabHeading} dangerouslySetInnerHTML={{ __html: product.meta_data?.[2]?.value || 'No description available.' }} />
                                <div className={styles.tabHeadDesc} dangerouslySetInnerHTML={{ __html: product.meta_data?.[4]?.value || 'No description available.' }} />
                            </div>
                            <div>
                                <div className={styles.tabHeading} dangerouslySetInnerHTML={{ __html: product.meta_data?.[6]?.value || 'No description available.' }} />
                                <div className={styles.tabHeadDesc} dangerouslySetInnerHTML={{ __html: product.meta_data?.[8]?.value || 'No description available.' }} />
                            </div>
                        </div>
                    </div>
                );
            case 'reviews':
                return (
                    <div className={styles.tabContent}>
                        <h3>Reviews</h3>
                        <p>Average Rating: {product.average_rating || 'No reviews yet.'}</p>
                        <p>Total Reviews: {product.rating_count || 0}</p>
                        {/* Add actual reviews if fetched */}
                        <p>No reviews available for this product.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.productDetails}>
            <div className={styles.productGallery}>
                <div className={styles.mainImage}>
                    <img src={images[currentImageIndex]?.src} alt={`${product.name} - Image ${currentImageIndex + 1}`} />
                </div>
                <div className={styles.thumbnailSlider}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`${styles.thumbnail} ${currentImageIndex === index ? styles.activeThumbnail : ''}`}
                            onClick={() => handleThumbnailClick(index)}
                        >
                            <img src={image.src} alt={`${product.name} - Thumbnail ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.productContent}>
                <div className={styles.naming}>
                    <div className={styles.namingTags}>
                        {/* Fixed: Use product.brand instead of product.brands */}
                        <p>{product.brands[0].name || 'N/A'}</p>
                        <p>{product.tags?.[0]?.name || 'N/A'}</p>
                    </div>
                    <h1>{product.name}</h1>
                    <div className={styles.rating}>
                        {renderStars(product.average_rating || '0')}
                        <span className={styles.ratingValue}>{product.average_rating || '0'}</span>
                        <span className={styles.ratingCount}>({product.rating_count || '0'} Ratings & reviews)</span>
                    </div>
                    {product.brand?.image && (
                        <img
                            src={product.brand.image.src} // Fixed: Correct reference
                            alt={product.brand.image.alt || product.brand.name}
                        />
                    )}
                </div>
                <div className={styles.pricing}>
                    <div className={styles.pricingHead}>
                        <p className={styles.oo}>
                            {Math.round(((product.regular_price - product.price) / product.regular_price) * 100)}% OFF
                        </p>
                    </div>
                    <p className={styles.price}>₹{parseFloat(product.price).toFixed(2)}</p>
                    {product.sale_price && (
                        <p className={styles.oldPrice}>
                            MRP ₹{parseFloat(product.regular_price).toFixed(2)}
                        </p>
                    )}
                    <div className={styles.addToCart1}>
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
                </div>
                <div className={styles.description_pan}>
                    <h2>Key Features</h2>
                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.short_description || 'N/A' }} />
                    <div className={styles.line}></div>
                    <h2>Brand Warranty</h2>
                    <p className={styles.warranty}>{product.meta_data?.[0]?.value || 'N/A'}</p>
                </div>
            </div>
            {/* Tabs Section */}
            <div className={styles.tabs}>
                <div className={styles.tabNav}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'specifications' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('specifications')}
                    >
                        Product Specifications
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'description' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews
                    </button>
                </div>
                <div className={styles.tabContentWrapper}>
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}