import { ProductWithQuantityI } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        mode: "payment",
        shipping_options: [
          { shipping_rate: "shr_1MyZwXCPvY6H2O68pVYPwIyx" },
          { shipping_rate: "shr_1MyZOyCPvY6H2O68LzLnY7cv" },
        ],
        line_items: req.body.map((item: ProductWithQuantityI) => {
          const img = item.image[0].asset._ref;

          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/i6mds6py/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success?status=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
