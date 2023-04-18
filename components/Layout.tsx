import Head from "next/head";
import { FC } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: FC<any> = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Headphones store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
