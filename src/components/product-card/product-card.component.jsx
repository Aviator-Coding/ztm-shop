import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { ProductCartContainer, Footer, Name, Price } from "./product-card.styles";
import { useSelector, useDispatch } from "react-redux";
import { selectCardItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCardItems);
  const addToCard = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  const { name, price, imageUrl } = product;
  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCard}>
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
