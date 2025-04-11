// pages/product/[id].js
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductDetails from '../../components/productDetails';
import Layout from '../../components/Layout';
import api from '../../lib/api';

export async function getStaticPaths() {
    const response = await api.get('/products', { params: { per_page: 100 } });
    const products = response.data;

    const paths = products.map((product) => ({
        params: { id: product.id.toString() },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    try {
        // Fetch product details
        const productResponse = await api.get(`/products/${params.id}`);
        const product = productResponse.data;

        // Initialize variables for brand and categories
        let brand = null;
        let categories = [];

        // Fetch brand details if product has a brand ID/slug
        if (product.brand) {
            try {
                const brandResponse = await api.get(`/products/brands/${product.brand}`);
                brand = brandResponse.data; // Contains id, name, image, etc.
            } catch (error) {
                console.error(`Error fetching brand for ID ${product.brand}:`, error);
            }
        }

        // Fetch category details if product has category IDs/slugs
        if (product.categories && Array.isArray(product.categories)) {
            try {
                const categoryIds = product.categories.join(',');
                const categoriesResponse = await api.get(`/products/categories`, {
                    params: { include: categoryIds },
                });
                categories = categoriesResponse.data;
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        // Combine product data with brand and categories
        const enhancedProduct = {
            ...product,
            brand: brand || null, // Includes image object with src
            categories: categories || [],
        };

        return {
            props: {
                product: enhancedProduct,
            },
            revalidate: 3600,
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