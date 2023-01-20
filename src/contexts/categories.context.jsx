import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data.js";

import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

// Create the Product Context
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// Create the Product Provider
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  //This code is used to load dummy Data in the fireStore DB
  // useEffect(() => {
  //   console.log({ SHOP_DATA });
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  // Get the Categories
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
};
