// lib/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wc/v3`,
    headers: {
        'Content-Type': 'application/json',
        // For Basic Auth (alternative approach)
        'Authorization': `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_SECRET}`
        ).toString('base64')}`
    },
    // OR use params for key-based auth (choose one approach)
    params: {
        consumer_key: process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_SECRET
    }
});

export default api;