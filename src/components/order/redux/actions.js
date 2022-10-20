import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  CART_CLEAR_ITEMS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_UNDELIVER_REQUEST,
  ORDER_UNDELIVER_SUCCESS,
  ORDER_UNDELIVER_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_UNDELIVER_RESET,
} from '../../../redux/constants';
import { errDispatch, userTokenConfig } from '../../../util/helperFunct';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { data } = await axios.post(
      `${baseUrl}/api/orders`,
      order,
      userTokenConfig({ json: 1, getState })
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    // dispatch({ type: ORDER_CREATE_RESET });
    dispatch({ type: CART_CLEAR_ITEMS });
    localStorage.removeItem('cartItems');
  } catch (error) {
    errDispatch(error, ORDER_CREATE_FAIL, dispatch);
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      `${baseUrl}/api/orders/${id}`,
      userTokenConfig({ getState })
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errDispatch(error, ORDER_DETAILS_FAIL, dispatch);
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const { data } = await axios.put(
        `${baseUrl}/api/orders/${orderId}/pay`,
        paymentResult,
        userTokenConfig({ json: 1, getState })
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      errDispatch(error, ORDER_PAY_FAIL, dispatch);
    }
  };

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const { data } = await axios.put(
      `${baseUrl}/api/orders/${order._id}/deliver`,
      {},
      userTokenConfig({ getState })
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errDispatch(error, ORDER_DELIVER_FAIL, dispatch);
  }
};

export const unDeliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_UNDELIVER_REQUEST,
    });

    const { data } = await axios.put(
      `${baseUrl}/api/orders/${order._id}/undeliver`,
      {},
      userTokenConfig({ getState })
    );

    dispatch({
      type: ORDER_UNDELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errDispatch(error, ORDER_UNDELIVER_FAIL, dispatch);
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELETE_REQUEST,
    });

    await axios.delete(
      `${baseUrl}/api/orders/${id}/delete`,
      userTokenConfig({ getState })
    );

    dispatch({ type: ORDER_DELETE_SUCCESS });

    dispatch({ type: ORDER_DETAILS_RESET });
    dispatch({ type: ORDER_PAY_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch({ type: ORDER_UNDELIVER_RESET });
  } catch (error) {
    console.log(error);
    errDispatch(error, ORDER_DELETE_FAIL, dispatch);
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(
      `${baseUrl}/api/orders/myorders`,
      userTokenConfig({ getState })
    );

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errDispatch(error, ORDER_LIST_MY_FAIL, dispatch);
  }
};

export const listOrders =
  (keyword = '', key = '', sort = '-createdAt', pageNumber = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      });

      const { data } = await axios.get(
        `${baseUrl}/api/orders/?keyword=${keyword}&key=${key}&pageNumber=${pageNumber}&sort=${sort}`,
        userTokenConfig({ getState })
      );

      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      errDispatch(error, ORDER_LIST_FAIL, dispatch);
    }
  };
