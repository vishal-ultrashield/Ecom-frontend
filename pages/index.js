import Header from '../components/header';
import HomeBody from '../components/home';
import Head from 'next/head';
import Footer from '../components/footer';
import Navigation from '../components/navigation';

export default function Home() {
  return (
    <>
      <Head>
        <title>ECOM - Fashion Tribe</title>
      </Head>
      <div>
        <Header />
        <div className='sticky'>
          <Navigation />
        </div>
        <HomeBody />
        <Footer />
      </div>
    </>

  );
}