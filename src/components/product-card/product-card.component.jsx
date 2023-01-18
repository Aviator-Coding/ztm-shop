import Button from "../button/button.component";
import "./product-card.styles.scss";

import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  const addToCard = () => {
    console.log(`Shop Component`, product);
    addItemToCart(product);
  };

  const { name, price, imageUrl } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addToCard}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
