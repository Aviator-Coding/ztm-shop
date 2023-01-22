import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/category/category.selector";

import Spinner from "../../components/spinner/spinner.component";

import { CategoryContainer, Title } from "./category.styles";

const Category = () => {
  // This is parsed from the url
  // /shop/:category
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => <ProductCard key={product.id} product={product} />)}
        </CategoryContainer>
      )}
    </>
  );
};

export default Category;
