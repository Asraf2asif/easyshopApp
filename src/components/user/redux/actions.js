import axios from 'axios';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_CLEAN,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  ORDER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  CART_CLEAR_ITEMS,
} from '../../../redux/constants';

import {
  setLocalStorage,
  excludeKey,
  errDispatch,
  userTokenConfig,
} from '../../../util/helperFunct';

// 'Access-Control-Allow-Headers':
//   'Origin, X-Requested-With, Content-Type, Accept',
// crossorigin: true,

const baseUrl = process.env.REACT_APP_BASE_URL;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data: user } = await axios.post(
      `${baseUrl}/api/users/login`,
      { email, password },
      userTokenConfig({ json: 0 })
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: excludeKey(user, ['password', '__v']),
    });

    setLocalStorage('userInfo', user);
  } catch (error) {
    errDispatch(error, USER_LOGIN_FAIL, dispatch);
  }
};

export const logout =
  (settings = {}) =>
  (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('shippingAddress');
    dispatch({
      type: USER_LOGOUT,
    });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_DETAILS_RESET });
    if (settings.cartClear && settings.cartClear !== false) {
      dispatch({ type: CART_CLEAR_ITEMS });
    }
  };

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data: user } = await axios.post(
      `${baseUrl}/api/users`,
      { name, email, password },
      userTokenConfig({ json: 0 })
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: user });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: excludeKey(user, ['password', '__v']),
    });

    dispatch({ type: USER_REGISTER_CLEAN });

    setLocalStorage('userInfo', user);
  } catch (error) {
    errDispatch(error, USER_REGISTER_FAIL, dispatch);
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data: user } = await axios.get(
      `${baseUrl}/api/users/${id}`,
      userTokenConfig({ json: 1, getState })
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: user });
  } catch (error) {
    errDispatch(error, USER_DETAILS_FAIL, dispatch);
  }
};

export const updateUserProfile = (userUpdate) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const { data: user } = await axios.put(
      `${baseUrl}/api/users/profile`,
      userUpdate,
      userTokenConfig({ json: 1, getState })
    );

    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: user });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: user });
    setLocalStorage('userInfo', { ...userInfo, ...user });
  } catch (error) {
    errDispatch(error, USER_UPDATE_PROFILE_FAIL, dispatch);
  }
};

export const listUsers =
  (keyword = '', key = '', sort = '-createdAt', pageNumber = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      });

      const { data: users } = await axios.get(
        `${baseUrl}/api/users/?keyword=${keyword}&key=${key}&pageNumber=${pageNumber}&sort=${sort}`,
        userTokenConfig({ getState })
      );

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: users,
      });
    } catch (error) {
      errDispatch(error, USER_LIST_FAIL, dispatch);
    }
  };

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    await axios.delete(
      `${baseUrl}/api/users/${id}`,
      userTokenConfig({ getState })
    );

    dispatch({ type: USER_DELETE_SUCCESS });

    if (userInfo._id === id) {
      logout();
    }
  } catch (error) {
    errDispatch(error, USER_DELETE_FAIL, dispatch);
  }
};

export const updateUser = (id, user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.put(
      `${baseUrl}/api/users/${id}`,
      user,
      userTokenConfig({ json: 1, getState })
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    if (userInfo._id === id) {
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
      setLocalStorage('userInfo', { ...userInfo, ...data });
    }
  } catch (error) {
    errDispatch(error, USER_UPDATE_FAIL, dispatch);
  }
};
