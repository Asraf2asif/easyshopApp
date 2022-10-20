import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_MODEL_VISIBILITY,
} from '../../../redux/constants';

import { setLocalStorage, errDispatch } from '../../../util/helperFunct';

export const addToCart = (product, qty) => async (dispatch, getState) => {
  try {
    const cartPayload = {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      rating: product.rating,
      numReviews: product.numReviews,
      discountPercentage: product.discountPercentage,
      countInStock: product.countInStock,
      qty,
    };

    dispatch({
      type: CART_ADD_ITEM,
      payload: cartPayload,
    });

    setLocalStorage('cartItems', getState().cart.cartItems);
  } catch (error) {
    console.log(error);
    errDispatch(error, CART_ADD_ITEM_FAIL, errDispatch);
  }
};

export const removeFromCart = (product) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: product,
  });

  setLocalStorage('cartItems', getState().cart.cartItems);
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  setLocalStorage('shippingAddress', data);
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  setLocalStorage('paymentMethod', data);
};

export const setModelVisibility = (visibility) => (dispatch) => {
  dispatch({
    type: CART_MODEL_VISIBILITY,
    payload: visibility,
  });
};
