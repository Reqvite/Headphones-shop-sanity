import { createContext, useState, FC, useContext } from "react";
import toast from "react-hot-toast";

const Context = createContext("1");

export const StateContext: FC<any> = ({ children }) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  const onAdd = (product, quantity: number) => {
    const isInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    setTotalQuantities((prevQty) => prevQty + quantity);

    if (isInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart.`);
  };

  const incQty = (): void => {
    setQty((prev) => prev + 1);
  };

  const decQty = (): void => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;

      return prev - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
