import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  CART_MODEL_VISIBILITY,
} from '../../../redux/constants';

export const cartReducer = (
  state = { cartItems: {}, shippingAddress: {}, modelVisibility: false },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const cartItemsAdd = state.cartItems;
      if (cartItemsAdd[action.payload.product]) {
        cartItemsAdd[action.payload.product].qty = action.payload.qty;
      } else {
        cartItemsAdd[action.payload.product] = action.payload;
      }
      return {
        ...state,
        cartItems: cartItemsAdd,
      };
    case CART_ADD_ITEM_FAIL:
      return { error: action.payload };
    case CART_REMOVE_ITEM:
      const cartItemsRemove = state.cartItems;
      delete cartItemsRemove[action.payload];
      return {
        ...state,
        cartItems: cartItemsRemove,
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_MODEL_VISIBILITY:
      return {
        ...state,
        modelVisibility: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: {},
      };
    default:
      return state;
  }
};
