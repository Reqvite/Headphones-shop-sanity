import { FC } from "react";
import type { AppProps } from "next/app";
import { Layout } from "@/components";
import "@/styles/globals.css";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";

const App: FC<any> = ({ Component, pageProps }: AppProps) => {
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
