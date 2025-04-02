import Header from '../components/header';
import HomeBody from '../components/home';
import Head from 'next/head';
import Footer from '../components/footer';
import Navigation from '../components/navigation';
import ProductDetails from '../components/productDetails';
import { getCollections } from '../data/collections';

export async function getStaticProps() {
  try {
    const { collections1, collections2 } = await getCollections();

    return {
      props: {
        collections1: collections1 || { collection1: { title: 'Trending', products: [] }, collection2: { title: 'New Release', products: [] } },
        collections2: collections2 || { collection3: { title: 'Price Drop', products: [] }, collection4: { title: 'Best Sellers', products: [] } },
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);

    return {
      props: {
        collections1: { collection1: { title: 'Trending', products: [] }, collection2: { title: 'New Release', products: [] } },
        collections2: { collection3: { title: 'Price Drop', products: [] }, collection4: { title: 'Best Sellers', products: [] } },
      },
      revalidate: 3600,
    };
  }
}

export default function Home({ collections1, collections2 }) {
  return (
    <>
      <Head>
        <title>ECOM - Fashion Tribe</title>
      </Head>
      <div>
        <Header />
        <ProductDetails />
        <div className='sticky'>
          <Navigation />
        </div>
        <HomeBody collections1={collections1} collections2={collections2} />

        <Footer />
      </div>
    </>
  );
}