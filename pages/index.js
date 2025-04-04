// pages/index.js
import Head from 'next/head';
import HomeBody from '../components/home';
import Layout from '../components/Layout';
import { getCollections } from '../data/collections';

export async function getStaticProps() {
  try {
    const { collections } = await getCollections();
    console.log('Collections in getStaticProps:', collections);
    return {
      props: {
        collections: collections || {},
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        collections: {},
      },
      revalidate: 3600,
    };
  }
}

export default function Home({ collections }) {
  console.log('Collections in Home component:', collections);
  return (
    <Layout>
      <Head>
        <title>ECOM - Fashion Tribe</title>
      </Head>
      <HomeBody collections={collections} />
    </Layout>
  );
}