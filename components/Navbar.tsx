import Link from "next/link";
import { FC } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";

const Navbar: FC = () => {
  const { showCart, setShowCart, totalQuantity } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Headphones Store</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(!showCart)}
      >
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQuantity}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
