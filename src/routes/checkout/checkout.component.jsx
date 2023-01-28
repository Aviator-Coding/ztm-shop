import { useSelector } from "react-redux";
import { selectCardItems, selectCartTotal } from "../../store/cart/cart.selector";

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles";
import PaymentForm from "../../components/payment-form/payment-form.component";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
const Checkout = () => {
  const cartItems = useSelector(selectCardItems);
  const cartTotal = useSelector(selectCartTotal);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems &&
        cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
      <Total>Total: {cartTotal}</Total>
      <PaymentForm />
    </CheckoutContainer>
  );
};
export default Checkout;
