// lib/api.js
import axios from 'axios';
import https from 'https';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wc/v3`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_SECRET}`
        ).toString('base64')}`,
    },
    httpsAgent: process.env.NODE_ENV === 'development' ? new https.Agent({ rejectUnauthorized: false }) : undefined,
});

export default api;