import { createContext, useState, FC, useContext } from "react";
import toast from "react-hot-toast";
import { ContextI, ProductWithQuantityI } from "@/types";

export const Context = createContext<ContextI>({
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  setCartItems: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
  totalQuantities: 0,
  setTotalQuantities: () => {},
  qty: 0,
  incQty: () => {},
  decQty: () => {},
  onAdd: () => {},
  toggleCartItemQuanitity: () => {},
  onRemove: () => {},
});

export const StateContext: FC<any> = ({ children }) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductWithQuantityI[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  let foundProduct: ProductWithQuantityI;
  let idx: number;

  const onAdd = (product: ProductWithQuantityI, quantity: number): void => {
    const isInCart = cartItems.find(
      (item: ProductWithQuantityI) => item._id === product._id
    );

    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    setTotalQuantities((prevQty) => prevQty + quantity);

    if (isInCart) {
      const updatedCartItems = cartItems.map(
        (cartProduct: ProductWithQuantityI) => {
          if (cartProduct._id === product._id)
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          return cartProduct;
        }
      );

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart.`);
  };

  const onRemove = (product: ProductWithQuantityI): void => {
    foundProduct = cartItems.find((item) => item._id === product._id)!;
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (id: string, value: string): void => {
    foundProduct = cartItems.find((item) => item._id === id)!;
    idx = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      const cartItems: any = [
        ...newCartItems,
        {
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        },
      ];

      setCartItems(cartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
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
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
