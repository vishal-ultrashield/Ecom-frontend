// pages/product/[id].js
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductDetails from '../../components/productDetails';
import Layout from '../../components/Layout';
import api from '../../lib/api';

export async function getStaticPaths() {
    const response = await api.get('/products', { params: { per_page: 100 } });
    const products = response.data;

    const paths = products.map(product => ({
        params: { id: product.id.toString() }
    }));

    return {
        paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params }) {
    try {
        const response = await api.get(`/products/${params.id}`);
        const product = response.data;

        return {
            props: {
                product
            },
            revalidate: 3600
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return { notFound: true };
    }
}

export default function ProductPage({ product }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Head>
                <title>{product.name} - ECOM Fashion Tribe</title>
            </Head>
            <ProductDetails product={product} />
        </Layout>
    );
}