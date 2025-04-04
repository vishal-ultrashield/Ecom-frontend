// pages/_app.js
import '../styles/globals.css';
import * as React from 'react';

export default function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}