import { FC } from "react";
import { Product, FooterBanner, HeroBanner } from "../components/";
import { client } from "@/lib/client";
import { BannerI, ProductI } from "@/types";

const Home: FC<{ products: ProductI[]; banners: BannerI[] }> = ({
  products,
  banners,
}) => {
  return (
    <>
      <HeroBanner heroBanner={banners && banners[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product: any) => (
          <Product key={product._id} {...product} />
        ))}
      </div>
      <FooterBanner footerBanner={banners && banners[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const banners = await client.fetch(bannerQuery);

  return {
    props: { products, banners },
  };
};

export default Home;
