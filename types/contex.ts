import { ProductWithQuantityI } from "./product";

export interface ContextI {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cartItems: ProductWithQuantityI[];
  setCartItems: (items: ProductWithQuantityI[]) => void;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  totalQuantities: number;
  setTotalQuantities: (quantities: number) => void;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: ProductWithQuantityI, quantity: number) => void;
  toggleCartItemQuanitity: (id: string, value: string) => void;
  onRemove: (product: ProductWithQuantityI) => void;
}
