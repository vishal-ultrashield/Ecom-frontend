import styles from '../components/header.module.css';
import Image from 'next/image';
import Logo from '../assets/logo.png';
// import { fontStyles } from '../lib/fonts';

export default function Header() {
    return (
        <>
            <header className={styles.header_container}>
                <section className={styles.discount_banner}>
                    <Image src='/assets/discount-sticker.svg'
                        width={100}
                        height={20}
                    />
                    <p>Instant Discount on selected banks.&nbsp;
                        <a href="#"><strong>See Products</strong></a>
                    </p>
                </section>
                <div className={styles.header}>
                    <Image className={styles.logo} src={Logo} />
                    <button className={styles.search_button}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15.2821 15.3778L20 20M17.2741 10.637C17.2741 14.3026 14.3026 17.2741 10.6371 17.2741C6.97152 17.2741 4 14.3026 4 10.637C4 6.9715 6.97152 4 10.6371 4C14.3026 4 17.2741 6.9715 17.2741 10.637Z" stroke="#7B7B7B" stroke-width="1.2" stroke-linecap="round"></path></svg>
                        Search for phone, TV, home appliances...
                    </button>
                    <div className={styles.ecom_ess}>
                        <button className={styles.ecom_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"></path></svg>
                            Store Locator
                        </button>
                        <button className={styles.ecom_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path></svg>
                            Help Center
                        </button>
                        <a href="" className={styles.ecom_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"></path></svg>
                        </a>
                        <a href="" className={styles.ecom_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"></path></svg>
                        </a>
                        <a href="" className={styles.ecom_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"></path></svg>
                        </a>
                    </div>
                </div>
                <div className={styles.nav_container}>
                    <div className={styles.navigation}>
                        <div className={styles.nav_item}>
                            <span>Air Conditioners  </span>
                        </div>
                        <div className={styles.nav_item}>
                            <span>Mobiles, Tablets & Accessories</span>
                        </div>
                        <div className={styles.nav_item}>
                            <span>Laptops & Accessories</span>
                        </div>
                        <div className={styles.nav_item}>
                            <span>Home Appliances</span>
                        </div>
                        <div className={styles.nav_item}>
                            <span>Kitchen Appliances</span>
                        </div>
                        <div className={styles.nav_item}>
                            <span>TV & Entertainment</span>
                        </div>
                        <div className={styles.nav_item}>
                            <span>Personal Care</span>
                        </div>
                        <div className={styles.nav_item}>
                            <span>Headphones & Speakers</span>
                        </div>
                    </div>
                </div>
            </header >
        </>
    );
}