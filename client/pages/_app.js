import Head from 'next/head'
import 'fontsource-roboto'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/global.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}

export default MyApp
