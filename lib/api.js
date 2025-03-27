import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
    params: {
        consumer_key: process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_WORDPRESS_CONSUMER_SECRET,
    },
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;