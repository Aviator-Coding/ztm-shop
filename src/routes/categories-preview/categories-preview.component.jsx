import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/category/category.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  return (
    <>
      {Object.keys(categoriesMap).map((title, idx) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={idx} title={title} products={products} />;
      })}
    </>
  );
};

export default CategoriesPreview;
