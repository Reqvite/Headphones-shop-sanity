import { urlFor } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const FooterBanner: FC<any> = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    desc,
    midText,
    product,
    buttonText,
    image,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <Image
          src={urlFor(image).url()}
          alt="headphones"
          className="footer-banner-image"
          width="555"
          height="555"
          unoptimized={true}
        />
      </div>
    </div>
  );
};

export default FooterBanner;
