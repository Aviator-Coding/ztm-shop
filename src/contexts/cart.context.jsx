import { createContext, useState } from "react";

const defaultCartState = {
  isVisible: false,
  products: [],
};

export const CartContext = createContext({
  currentCart: null,
  setCurrentCart: () => null,
});

export const CartProvider = ({ children }) => {
  const [currentCart, setCurrentCart] = useState(defaultCartState);

  const value = { currentCart, setCurrentCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
