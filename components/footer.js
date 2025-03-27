import styles from '../components/footer.module.css';
import Image from 'next/image';
import Logo from '../assets/logo.png';

export default function Footer() {
    return (
        <>
            <div className={`${styles.footer} flex_col`}>
                <div className="default_width">
                    <section className={styles.prefooter}>
                        <div className={styles.footer_features}>
                            <div className={styles.feature}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M480-323.33q73.61 0 125.14-51.53T656.67-500q0-73.06-51.84-124.19Q553-675.33 480-676.67v53.34q51.33.66 87.33 36.49 36 35.82 36 87 0 51.17-35.97 87.17t-87.36 36q-33.24 0-61.96-16.33-28.71-16.33-45.37-45.33l-46 25.66q24 41.34 64.53 65.34 40.54 24 88.8 24Zm-149.92-146q11.59 0 19.09-7.58t7.5-19.17q0-11.59-7.58-19.09t-19.17-7.5q-11.59 0-19.09 7.58t-7.5 19.17q0 11.59 7.58 19.09t19.17 7.5Zm22-84q11.59 0 19.09-7.58t7.5-19.17q0-11.59-7.58-19.09t-19.17-7.5q-11.59 0-19.09 7.58t-7.5 19.17q0 11.59 7.58 19.09t19.17 7.5Zm58-55q11.59 0 19.09-7.58t7.5-19.17q0-11.59-7.58-19.09t-19.17-7.5q-11.59 0-19.09 7.58t-7.5 19.17q0 11.59 7.58 19.09t19.17 7.5ZM480-80.67q-139.67-35-229.83-161.5Q160-368.67 160-520.67v-240l320-120 320 120v240q0 152-90.17 278.5Q619.67-115.67 480-80.67Zm0-69.33q111.33-36.33 182.33-139.67 71-103.33 71-231v-193.66L480-809.67l-253.33 95.34v193.66q0 127.67 71 231Q368.67-186.33 480-150Zm0-330Z" /></svg>
                                <h2>Extended Warrenty</h2>
                                <p>Got a question? Look no <br></br>
                                    further calls us.</p>
                            </div>
                            <div className={styles.feature}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M386.67-555.33 480-602l93.33 46.67v-218H386.67v218ZM280-280v-80h200v80H280Zm-93.33 160q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h586.66q27 0 46.84 19.83Q840-800.33 840-773.33v586.66q0 27-19.83 46.84Q800.33-120 773.33-120H186.67Zm0-653.33v586.66-586.66Zm0 586.66h586.66v-586.66H640v326l-160-80-160 80v-326H186.67v586.66Z" /></svg>
                                <h2>Free Delivery</h2>
                                <p>Available on all our<br></br> products.</p>
                            </div>
                            <div className={styles.feature}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M273.33-160q-50 0-83-35.67-33-35.66-29.66-85h-100l14.66-66.66h112.34q15.66-18.34 37.66-28.84 22-10.5 48-10.5t48 10.5q22 10.5 37.67 28.84h187.67l89.33-386H264.67L279-800h440.33L681-633.33h122.33l116 154.66-39.33 198h-80q3.33 49.34-30 85Q736.67-160 686.67-160t-83-35.67q-33-35.66-29.67-85H386.67q3.33 49.34-30 85Q323.33-160 273.33-160ZM635-433.33h207.67l5.33-29-78-104.34H665.67L635-433.33Zm1-300-89.33 386 6-26.34L636-733.33ZM140-444.67V-560H53.33L180-754.67V-640h86.67L140-444.67Zm133.33 218q19.67 0 33.17-13.83t13.5-32.83q0-19.67-13.5-33.17T273.33-320q-19 0-32.83 13.5-13.83 13.5-13.83 33.17 0 19 13.83 32.83 13.83 13.83 32.83 13.83Zm413.34 0q19.66 0 33.16-13.83 13.5-13.83 13.5-32.83 0-19.67-13.5-33.17T686.67-320q-19 0-32.84 13.5Q640-293 640-273.33q0 19 13.83 32.83 13.84 13.83 32.84 13.83Z" /></svg>
                                <h2>Same Day Shipping</h2>
                                <p>Order by 4pm for same-day<br></br> shipping.</p>
                            </div>
                            <div className={styles.feature}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M146.67-640h666.66v-93.33H146.67V-640ZM80-733.33q0-27 19.83-46.84Q119.67-800 146.67-800h666.66q27 0 46.84 19.83Q880-760.33 880-733.33V-494H146.67v267.33h210V-160h-210q-27 0-46.84-19.83Q80-199.67 80-226.67v-506.66ZM598-80 428-250l47.33-47.33 122.67 122 235.33-235.34L880-362 598-80ZM146.67-733.33v506.66V-392v124.33-465.66Z" /></svg>
                                <h2>Easy Installment</h2>
                                <p>Pay for your purchase in<br></br> easy EMIs.</p>
                            </div>
                        </div>
                    </section>
                    <section className={styles.footer_content}>
                        <div className={styles.footer_col1}>
                            <h2>Stay in touch with us, get product updates, offers, discounts directly to your inbox</h2>
                            <form>
                                <input type='text' placeholder='Enter email address'></input>
                                <div className={styles.form_acceptance}>
                                    <input type='checkbox'></input>
                                    <label>By selecting this option you agree with our Privacy policy and Terms & Conditions</label>
                                </div>
                                <button type='submit'>Subscribe</button>
                            </form>
                        </div>
                        <div className={styles.footer_col2}>
                            <div className={styles.list}>
                                <h2>Categories</h2>
                                <div className={styles.list_items}>
                                    <span>Home Appliances</span>
                                    <span>Kitchen Appliances</span>
                                    <span>TV & Entertainment</span>
                                    <span>Mobiles, Tablets & Accessories</span>
                                    <span>Headphones & Speakers</span>
                                    <span>Brand Stores</span>
                                </div>
                            </div>
                            <div className={styles.list1}>
                                <h2>Trending</h2>
                                <div className={styles.list_items}>
                                    <span>Iphone 16</span>
                                    <span>Iphone 16 Pro</span>
                                    <span>Iphone 16e</span>
                                    <span>HP Laptop</span>
                                    <span>Smartwatch</span>
                                </div>
                            </div>
                            <div className={styles.list1}>
                                <h2>Company</h2>
                                <div className={styles.list_items}>
                                    <span>About us</span>
                                    <span>Career</span>
                                    <span>E-waste</span>
                                    <span>Contact</span>
                                    <span>Store locator</span>
                                    <span>Help Center</span>
                                </div>
                            </div>
                            <div className={styles.list2}>
                                <h2>Legals</h2>
                                <div className={styles.list_items}>
                                    <span>Cancellation & Return</span>
                                    <span>Warrenty</span>
                                    <span>Terms & Conditions</span>
                                    <span>Disclaimer</span>
                                    <span>Privacy Policy</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.footer_col3}>
                            <div className={styles.part1}>
                                <h2>Follow us on Socials
                                </h2>
                                <svg class="e-font-icon-svg e-fab-facebook" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
                                <svg class="e-font-icon-svg e-fab-twitter" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
                                <svg class="e-font-icon-svg e-fab-youtube" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>
                            </div>
                            <div className={styles.part2}>
                                Ecom ltd. All rights reserved | &copy; 2025
                            </div>
                            <div className={styles.part3}>
                                <h2>We accept
                                </h2>
                                <Image src='/assets/visa.png'
                                    height={13}
                                    width={44}
                                />
                                <Image src='/assets/amex.png'
                                    height={15}
                                    width={50}
                                />
                                <Image src='/assets/mastercard.png'
                                    height={17}
                                    width={30}
                                />
                                <Image src='/assets/pinelabs.png'
                                    height={13}
                                    width={77}
                                />
                                <Image src='/assets/payu.png'
                                    height={17}
                                    width={33}
                                />
                            </div>
                        </div>
                    </section>
                </div >
            </div>
        </>
    )
}