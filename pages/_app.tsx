import { FC } from "react";
import { Layout } from "@/components";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const App: FC<any> = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
