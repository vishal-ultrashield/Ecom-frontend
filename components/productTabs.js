'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from './product-tabs.module.css';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductTabs({ collections = {} }) {
    console.log('Collections received in ProductTabs:', collections); // Add this for debugging
    const [activeTab, setActiveTab] = useState(Object.keys(collections)[0] || '');

    const calculateDiscount = (price_old, price) => {
        if (!price_old) return null;
        const oldP = parseFloat(price_old.replace(/[₹$,]/g, ''));
        const newP = parseFloat(price.replace(/[₹$,]/g, ''));
        if (isNaN(oldP) || isNaN(newP) || oldP <= newP) return null;
        return Math.round(((oldP - newP) / oldP) * 100);
    };

    if (!collections || Object.keys(collections).length === 0) {
        return <div>No products available at the moment. Please check back later!</div>;
    }

    return (
        <section className={styles.tabsSection}>
            <div className={styles.tabNav}>
                {Object.keys(collections).map((key) => (
                    <button
                        key={key}
                        className={`${styles.tabButton} ${activeTab === key ? styles.active : ''}`}
                        onClick={() => setActiveTab(key)}
                    >
                        {collections[key].title}
                    </button>
                ))}
            </div>

            <div className={styles.tabContent}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    loop={true}
                    className={styles.productCarousel}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 2, spaceBetween: 15 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                    }}
                >
                    {collections[activeTab].products.length === 0 ? (
                        <div>No products in this collection.</div>
                    ) : (
                        collections[activeTab].products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className={styles.productCard}>
                                    <p className={styles.discount}>
                                        {calculateDiscount(product.price_old, product.price)}% OFF
                                    </p>
                                    <img src={product.image} alt={product.name} className={styles.productImage} />
                                    <h3>{product.name}</h3>
                                    <div className={styles.svg_stack}>
                                        <svg
                                            aria-hidden="true"
                                            className="e-font-icon-svg e-fas-star-of-life"
                                            viewBox="0 0 480 512"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M471.99 334.43L336.06 256l135.93-78.43c7.66-4.42 10.28-14.2 5.86-21.86l-32.02-55.43c-4.42-7.65-14.21-10.28-21.87-5.86l-135.93 78.43V16c0-8.84-7.17-16-16.01-16h-64.04c-8.84 0-16.01 7.16-16.01 16v156.86L56.04 94.43c-7.66-4.42-17.45-1.79-21.87 5.86L2.15 155.71c-4.42 7.65-1.8 17.44 5.86 21.86L143.94 256 8.01 334.43c-7.66 4.42-10.28 14.21-5.86 21.86l32.02 55.43c-4.42 7.65 14.21 10.27 21.87 5.86l135.93-78.43V496c0 8.84 7.17 16 16.01 16h64.04c-8.84 0 16.01-7.16 16.01-16V339.14l135.93 78.43c7.66 4.42 17.45 1.8 21.87-5.86l32.02-55.43c-4.42-7.65 1.8-17.43-5.86-21.85z"></path>
                                        </svg>
                                        {/* Repeat SVG for other stars */}
                                    </div>
                                    <div className={styles.price_stack}>
                                        <p className={styles.product_price}>{product.price}</p>
                                        <p className={styles.product_old_price}>MRP {product.price_old}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </section>
    );
}