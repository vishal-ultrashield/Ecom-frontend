import Head from 'next/head';
import Layout from '../components/Layout';
import MyAccount from '../components/MyAccount';

export default function MyAccountPage() {
    return (
        <Layout>
            <Head>
                <title>My Account - ECOM Fashion Tribe</title>
            </Head>
            <MyAccount />
        </Layout>
    );
}