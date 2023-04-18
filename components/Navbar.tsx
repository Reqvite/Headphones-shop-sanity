import Link from "next/link";
import { FC } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar: FC = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Headphones Store</Link>
      </p>
      <button type="button" className="cart-icon">
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
};

export default Navbar;
