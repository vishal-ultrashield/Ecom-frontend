// index.js
import Header from '../components/header';
import HomeBody from '../components/home';
import Head from 'next/head';
import Footer from '../components/footer';
import Navigation from '../components/navigation';
import { getCollections } from '../data/collections';

export async function getStaticProps() {
  try {
    const { collections } = await getCollections();
    return {
      props: {
        collections: collections || {},
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: {
        collections: {},
      },
      revalidate: 3600,
    };
  }
}

export default function Home({ collections }) {
  return (
    <>
      <Head>
        <title>ECOM - Fashion Tribe</title>
      </Head>
      <Header />
      <div className='sticky'>
        <Navigation />
      </div>
      <HomeBody collections={collections} />
      <Footer />
    </>
  );
}