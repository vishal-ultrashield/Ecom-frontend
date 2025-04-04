// pages/checkout.js
import Head from 'next/head';
import Layout from '../components/Layout';
import Checkout from '../components/Checkout';

export default function CheckoutPage() {
    return (
        <Layout>
            <Head>
                <title>Checkout - ECOM Fashion Tribe</title>
            </Head>
            <Checkout />
        </Layout>
    );
}