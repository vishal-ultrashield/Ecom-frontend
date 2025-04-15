// pages/api/login.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/jwt-auth/v1/token`,
            {
                username: email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Remove Authorization header if JWT plugin doesn't require it
                    // Authorization: `Basic ${Buffer.from(
                    //     `${process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_SECRET}`
                    // ).toString('base64')}`,
                },
            }
        );

        const { token, user_id } = response.data;
        console.log(token)
        if (token && user_id) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userId', user_id);
            }
            res.status(200).json({ success: true });
        } else {
            throw new Error('Invalid token response');
        }
    } catch (error) {
        console.error('JWT Authentication error:', error.response?.data || error.message);
        res.status(401).json({ message: 'Invalid credentials' });
    }
}