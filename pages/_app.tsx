import { FC } from "react";
import { Layout } from "@/components";
import "@/styles/globals.css";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";
import { AppProps } from "next/app";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
};

export default App;
