import { FC, useEffect, useRef } from "react";
import { Transition } from "react-transition-group";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import Image from "next/image";
import { getStripe } from "@/lib/getStripe";

const Cart: FC = () => {
  const cartRef = useRef<HTMLDivElement>(null);

  const {
    showCart,
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.classList.contains("cart-wrapper")) {
        setShowCart(false);
      }
    };

    const hanldeEsc = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setShowCart(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", hanldeEsc);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", hanldeEsc);
    };
  }, [cartRef, setShowCart]);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.status === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <Transition nodeRef={cartRef} in={showCart} timeout={0} appear={true}>
        {(state: string) => (
          <div className={`cart-container ${state}`}>
            <button
              type="button"
              className="cart-heading"
              onClick={() => setShowCart(!showCart)}
            >
              <AiOutlineLeft />
              <span className="heading">Your cart</span>
              <span className="cart-num-items">{totalQuantities} items</span>
            </button>
            {cartItems.length === 0 && (
              <div className="empty-cart">
                <AiOutlineShopping size={150} />
                <h3>Your shopping cart it empty</h3>
                <Link href="/">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setShowCart(!showCart)}
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            )}
            <div className="product-container">
              {cartItems.length >= 1 &&
                cartItems.map((item) => (
                  <div className="product" key={item._id}>
                    <Image
                      src={urlFor(item?.image[0]).url()}
                      alt="item"
                      className="cart-product-image"
                      width="50"
                      height="50"
                      unoptimized={true}
                    />
                    <div className="item-desc">
                      <div className="flex top">
                        <h5>{item.name}</h5>
                        <h4>${item.price}</h4>
                      </div>
                      <div className="flex bottom">
                        <div>
                          <p className="quantity-desc">
                            <span
                              className="minus"
                              onClick={() =>
                                toggleCartItemQuanitity(item._id, "dec")
                              }
                            >
                              <AiOutlineMinus />
                            </span>
                            <span className="num">{item.quantity}</span>
                            <span
                              className="plus"
                              onClick={() =>
                                toggleCartItemQuanitity(item._id, "inc")
                              }
                            >
                              <AiOutlinePlus />
                            </span>
                          </p>
                        </div>
                        <button
                          type="button"
                          className="remove-item"
                          onClick={() => onRemove(item)}
                        >
                          <TiDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {cartItems.length !== 0 && (
              <div className="cart-bottom">
                <div className="total">
                  <h3>Subtotal:</h3>
                  <h3>${totalPrice}</h3>
                </div>
                <div className="btn-container">
                  <button
                    type="button"
                    className="btn"
                    onClick={handleCheckout}
                  >
                    Pay with Stripe
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Cart;
