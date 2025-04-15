// pages/login.js
import { useState, useEffect } from 'react';
import styles from '../components/login.module.css';
import { useRouter } from 'next/router';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setError('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            if (data.success) {
                router.push('/my-account');
            } else {
                throw new Error('Login unsuccessful');
            }
        } catch (error) {
            console.error('Login error:', error.message);
            setError(error.message);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h1>Login</h1>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.loginButton}>Login</button>
                <p>New user? You'll be prompted to log in after your first order.</p>
            </form>
        </div>
    );
}