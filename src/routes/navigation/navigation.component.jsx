import { Outlet, Link } from "react-router-dom";
import { singOutUser } from "../../utils/firebase.utils";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { useContext } from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
  //exposes the setCurrentUser Function from our Context Provider
  const { currentUser } = useContext(UserContext);
  const { currentCart, setCurrentCart } = useContext(CartContext);
  const { isVisible } = currentCart;

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={singOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN-IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isVisible && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
