import type { AppProps } from 'next/app'
import '@src/styles/globals.css'
import '@src/styles/responsive.css'
import "rsuite/dist/rsuite.css";
import "react-toastify/dist/ReactToastify.css";
import ReactQueryClient from '@src/services/ReactQueryClient'
import { AuthProvider } from '@src/contexts/AuthContext'
import Layout from '@src/layout'
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const _App = ({ Component, pageProps }: AppProps) => {
  const { asPath } = useRouter();

  if (asPath.includes("/dashboard")) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
  return <Component {...pageProps} />
}

export default function App(props: AppProps) {
  return (
    <ReactQueryClient>
      <AuthProvider>
        <_App {...props} />
      </AuthProvider>
      <ToastContainer />
    </ReactQueryClient>
  )
}
