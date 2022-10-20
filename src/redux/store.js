import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { getLocalStorage } from '../util/helperFunct';
// reducers import
import {
  productListReducer,
  productDetailsReducer, 
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  navCategoryReducer,
} from '../components/product/redux/reducers';
import { cartReducer } from '../components/cart/redux/reducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderDeliverReducer,
  orderUnDeliverReducer,
  orderDeleteReducer,
  orderListReducer,
} from '../components/order/redux/reducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from '../components/user/redux/reducers';
import { fieldListReducer } from '../components/_partial/filterModel/redux/reducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  navCategory: navCategoryReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderUnDeliver: orderUnDeliverReducer,
  orderDelete: orderDeleteReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  fieldList: fieldListReducer,
});

// initial state from localStorage
const cartItemFromLocalStorage = getLocalStorage('cartItems', {});
const userInfoFromLocalStorage = getLocalStorage('userInfo', null);
const shippingAddressFromStorage = getLocalStorage('shippingAddress', {});

const initialState = {
  cart: {
    cartItems: cartItemFromLocalStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
  userDetails: { user: userInfoFromLocalStorage },
};

const middlewares = [thunk];
// store creation
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
