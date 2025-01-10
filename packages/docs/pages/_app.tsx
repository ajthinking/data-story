import '../globals.css'

//@ts-ignore
export default function extra({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
