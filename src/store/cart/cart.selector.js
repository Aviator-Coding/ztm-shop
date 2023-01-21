import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCardItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCardIsOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCardItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCardItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
);
