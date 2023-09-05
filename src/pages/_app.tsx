import type { AppProps } from "next/app";
import "@src/styles/globals.css";
import "@src/styles/responsive.css";
import "rsuite/dist/rsuite.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import ReactQueryClient from "@src/services/ReactQueryClient";
import { AuthProvider } from "@src/contexts/AuthContext";
import Layout from "@src/layout";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "@src/redux/store";
import { ConfirmDialogProvider } from "@src/contexts/ConfirmDialogContext";
const _App = ({ Component, pageProps }: AppProps) => {
  const { asPath } = useRouter();

  if (asPath.includes("/dashboard")) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
  return <Component {...pageProps} />;
};

export default function App(props: AppProps) {
  return (
    <ReactQueryClient>
      <AuthProvider>
        <Provider store={store}>
          <ConfirmDialogProvider>
            <_App {...props} />
          </ConfirmDialogProvider>
        </Provider>
      </AuthProvider>
      <ToastContainer />
    </ReactQueryClient>
  );
}
