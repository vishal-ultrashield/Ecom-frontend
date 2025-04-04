// pages/order-confirmation/[orderId].js
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import OrderConfirmation from '../../components/OrderConfirmation';
import api from '../../lib/api';

export async function getServerSideProps({ params }) {
    try {
        const response = await api.get(`/orders/${params.orderId}`);
        const order = response.data;
        return { props: { order } };
    } catch (error) {
        console.error('Error fetching order:', error);
        return { notFound: true };
    }
}

export default function OrderConfirmationPage({ order }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Head>
                <title>Order Confirmation - ECOM Fashion Tribe</title>
            </Head>
            <OrderConfirmation order={order} />
        </Layout>
    );
}