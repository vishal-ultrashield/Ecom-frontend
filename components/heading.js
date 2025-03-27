import styles from '../components/header.module.css';
import Image from 'next/image';
import Logo from '../assets/logo.png';
// import { fontStyles } from '../lib/fonts';

export default function Header1() {
    return (
        <header className={styles.header_container}>
            <div className={styles.header}>
                <Image className={styles.logo} src={Logo} />
                <div className="flex">
                    <nav className={styles.navigation}>
                        <span className="sm_para">Women</span>
                        <span className="sm_para">Men</span>
                        <span className="sm_para">Best Seller</span>
                        <span className="sm_para">New Arrivals</span>
                        <span className="sm_para">About</span>
                        <span className="sm_para">Support</span>
                    </nav>
                    <div className="flex">
                        <span class="material-symbols-outlined">
                            person
                        </span>
                        <span class="material-symbols-outlined">
                            shopping_cart
                        </span>
                        <span class="material-symbols-outlined">
                            search
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}