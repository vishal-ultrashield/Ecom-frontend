// lib/api.js
import axios from 'axios';
import https from 'https';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wc/v3`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_SECRET}`
        ).toString('base64')}`
    },
    params: {
        consumer_key: process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_SECRET
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false // Bypass SSL verification for development
    })
});

export default api;