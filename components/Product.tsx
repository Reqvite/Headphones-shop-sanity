import { urlFor } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Product: FC<any> = ({ image, name, slug, price }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            src={urlFor(image[0]).url()}
            alt="headphones"
            className="product-image"
            width="250"
            height="250"
            unoptimized={true}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
