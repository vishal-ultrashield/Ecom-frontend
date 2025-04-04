// pages/cart.js
import Head from 'next/head';
import Layout from '../components/Layout';
import Cart from '../components/Cart';

export default function CartPage() {
    return (
        <Layout>
            <Head>
                <title>Cart - ECOM Fashion Tribe</title>
            </Head>
            <Cart />
        </Layout>
    );
}