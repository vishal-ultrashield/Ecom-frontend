import styles from '../components/navigation.module.css';

export default function Navigation() {
    return (
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
    );
}