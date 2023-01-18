import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { currentCart, setCurrentCart } = useContext(CartContext);

  const toggleView = () => {
    setCurrentCart({ isVisible: !currentCart.isVisible });
  };

  console.log(currentCart);
  return (
    <div className="cart-icon-container" onClick={toggleView}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
