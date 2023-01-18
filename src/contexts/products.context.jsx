import { createContext, useState } from "react";
import SHOP_DATA from "../shop-data.json";

// Create the Product Context
export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

// Create the Product Provider
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const value = {
    products,
    setProducts,
  };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
