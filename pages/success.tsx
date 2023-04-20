import { FC, useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";

import { useStateContext } from "../context/StateContext";
import Link from "next/link";
import { runConfetti } from "@/lib/utils";

const Success: FC = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  const router = useRouter();
  const { status } = router.query;

  useEffect(() => {
    if (status === "true") {
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      runConfetti();
    }
  }, [router, setCartItems, setTotalPrice, setTotalQuantities, status]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>
          {status !== "true"
            ? "You haven&apos;t completed your purchase yet."
            : "Thank you for your order!"}
        </h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
