'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import styles from '../components/home.module.css';
import Image from 'next/image';
import Banner from '../assets/banner-new.jpg';
import Banner1 from '../assets/banner-new1.jpg';
import Banner2 from '../assets/banner-new2.jpg';
import Logo from '../assets/logo.png';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import ProductTabs from '../components/productTabs';
import { collections1, homeEssentials, airFryersTrimmers } from '../data/collections';
// import HomeEssentials from './homeEssentials-tab';

// export async function getStaticProps() {
//     const { collections1, collections2 } = await getCollections();

//     return {
//         props: {
//             collections1,
//             collections2,
//         },
//         revalidate: 3600, // Revalidate every hour
//     };
// }

export default function HomeBody() {
    return (
        <div className={`${styles.top_sec} flex_col`}>
            <div className="default_width">
                <section className={styles.hero}>

                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 50000 }}
                        loop
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        speed={1000}
                    >
                        <SwiperSlide>
                            <div className={styles.home_banner}>
                                <Image
                                    src={Banner}
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={styles.home_banner1}>
                                <Image src={Banner1} />
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </section>
                <section className={styles.after_hero}>
                    <div className={styles.categories}>
                        <div className={styles.category_item}>
                            <div className={styles.image_container}>
                                <Image src="/assets/television-logo.png"
                                    width={90}
                                    height={56}
                                />
                            </div>
                            <span>Television</span>
                        </div>
                        <div className={styles.category_item}>
                            <div className={styles.image_container}>
                                <Image src="/assets/smartphones.png"
                                    width={90}
                                    height={56}
                                />
                            </div>
                            <span>Smartphones</span>
                        </div>
                        <div className={styles.category_item}>
                            <div className={styles.image_container}>
                                <Image src="/assets/washing-machine-logo.png"
                                    width={42}
                                    height={56}
                                />
                            </div>
                            <span>Washing Machine</span>
                        </div>
                        <div className={styles.category_item}>
                            <div className={styles.image_container}>
                                <Image src="/assets/laptops-logo.png"
                                    width={85}
                                    height={56}
                                />
                            </div>
                            <span>Laptops</span>
                        </div>
                        <div className={styles.category_item}>
                            <div className={styles.image_container}>
                                <Image src="/assets/headphones.png"
                                    width={90}
                                    height={56}
                                />
                            </div>
                            <span>Audio</span>
                        </div>
                        <div className={styles.category_item}>
                            <div className={styles.image_container}>
                                <Image src="/assets/gaming-logo.png"
                                    width={84}
                                    height={56}
                                />
                            </div>
                            <span>Gaming</span>
                        </div>
                    </div>
                </section>
                <section className={styles.product_tabs}>
                    <h3 className={styles.text_center}>Exclusive Deals & Offers</h3>
                    <ProductTabs collections={collections1} />
                </section>
                <section className={styles.banner24}>
                    <Image src={Banner2} width={1250} />
                </section>
                <section className={styles.product_tabs}>
                    <h3 className={styles.text_center}>Home Essentials</h3>
                    <ProductTabs collections={homeEssentials} />
                </section>

                <section className={styles.banner25}>
                    <Image src='/assets/airfryer_banner.jpeg'
                        width={616}
                        height={300}
                    />
                    <Image src='/assets/trimmer_banner.jpeg'
                        width={616}
                        height={300}
                    />
                </section>
                <section className={styles.product_tabs1}>
                    <ProductTabs collections={airFryersTrimmers} />
                </section>
                <section className={styles.brands}>
                    <h3 className={styles.text_center_in_real}>Discover Leading Brands</h3>
                    <p className={styles.text_center_in_real_for_para}>Explore a curated selection of leading brands, where innovation meets quality, only at Vijay Sales.</p>
                    <div className={styles.brand_logos}>
                        <Image src='/assets/logos/dell.svg'
                            width={120}
                            height={120}
                        />
                        <Image src='/assets/logos/asus.svg'
                            width={120}
                            height={120}
                        />
                        <Image src='/assets/logos/boat.svg'
                            width={120}
                            height={120}
                        />
                        <Image src='/assets/logos/bose.svg'
                            width={120}
                            height={120}
                        />
                        <Image src='/assets/logos/dyson.svg'
                            width={120}
                            height={120}
                        />
                        <Image src='/assets/logos/godrej.svg'
                            width={120}
                            height={120}
                        />
                        <Image src='/assets/logos/ifb.svg'
                            width={120}
                            height={120}
                        />
                        <Image src='/assets/logos/lenovo.svg'
                            width={120}
                            height={120}
                        />
                    </div>
                    <button>Shop top brands</button>
                </section>
            </div>
        </div >
    );
}