import '../globals.css'
import Head from 'next/head';

export default function extra({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>data-story</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='pwa-icon' href='/favicon.png'/>
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
