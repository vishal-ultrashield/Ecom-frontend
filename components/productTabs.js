// productTabs.js
'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from './product-tabs.module.css';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductTabs({ collections = {} }) {
    const [activeTab, setActiveTab] = useState(Object.keys(collections)[0] || '');

    const calculateDiscount = (price_old, price) => {
        if (!price_old) return null;
        const oldP = parseFloat(price_old.replace(/[₹$,]/g, ''));
        const newP = parseFloat(price.replace(/[₹$,]/g, ''));
        if (isNaN(oldP) || isNaN(newP) || oldP <= newP) return null;
        return Math.round(((oldP - newP) / oldP) * 100);
    };

    if (!collections || Object.keys(collections).length === 0) {
        return <div>No categories available at the moment. Please check back later!</div>;
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
                    loop={collections[activeTab]?.products.length > 4}
                    className={styles.productCarousel}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 2, spaceBetween: 15 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                    }}
                >
                    {collections[activeTab]?.products.length === 0 ? (
                        <SwiperSlide>
                            <div>No products in this category.</div>
                        </SwiperSlide>
                    ) : (
                        collections[activeTab].products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className={styles.productCard}>
                                    {calculateDiscount(product.price_old, product.price) && (
                                        <p className={styles.discount}>
                                            {calculateDiscount(product.price_old, product.price)}% OFF
                                        </p>
                                    )}
                                    <img src={product.image} alt={product.name} className={styles.productImage} />
                                    <h3>{product.name}</h3>
                                    <div className={styles.price_stack}>
                                        <p className={styles.product_price}>{product.price}</p>
                                        {product.price_old && (
                                            <p className={styles.product_old_price}>MRP {product.price_old}</p>
                                        )}
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