// pages/my-orders.js
import { useEffect } from 'next/router';

export default function MyOrders() {
    const router = useRouter();

    useEffect(() => {
        router.push('/my-account?tab=orders');
    }, [router]);

    return null;
}