import styles from './myAccount.module.css';

export default function MyAccount() {
    const user = { name: "John Doe", email: "john@example.com" };

    return (
        <div className={styles.myAccount}>
            <h1>My Account</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Add order history, account settings, etc. */}
        </div>
    );
}