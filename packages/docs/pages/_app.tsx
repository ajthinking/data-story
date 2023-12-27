import '../globals.css'
import Head from 'next/head';
import icons from '../public/icons.json';

export default function extra({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>data-story</title>
        // We will generate corresponding links in the Head for all images in the icons folder
        {
          icons.icons.map(({src, sizes}) => (
            <link key={src} rel="icon" href={`/${src}`} sizes={sizes} />
          ))
        }
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='pwa-icon' href='/favicon.png'/>
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
