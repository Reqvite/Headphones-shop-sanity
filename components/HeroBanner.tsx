import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/client";
import { BannerI } from "@/types";

const HeroBanner: FC<{ heroBanner: BannerI }> = ({
  heroBanner: {
    largeText1,
    smallText,
    desc,
    midText,
    product,
    buttonText,
    image,
  },
}) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <Image
          src={urlFor(image).url()}
          alt="headphones"
          className="hero-banner-image"
          width="555"
          height="555"
          unoptimized={true}
        />
        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
