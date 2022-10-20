import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  NAV_CATEGORY_REQUEST,
  NAV_CATEGORY_SUCCESS,
  NAV_CATEGORY_FAIL,
} from '../../../redux/constants';

import { errDispatch, userTokenConfig } from '../../../util/helperFunct';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const listProduct =
  (keyword = '', key = '', sort = 'name', pageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `${baseUrl}/api/products/?keyword=${keyword}&key=${key}&pageNumber=${pageNumber}&sort=${sort}`,
        userTokenConfig({ auth: 0 })
      );

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      errDispatch(error, PRODUCT_LIST_FAIL, dispatch);
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data: product } = await axios.get(
      `${baseUrl}/api/products/${id}`,
      userTokenConfig({ auth: 0 })
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
  } catch (error) {
    errDispatch(error, PRODUCT_DETAILS_FAIL, dispatch);
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    await axios.delete(
      `${baseUrl}/api/products/${id}`,
      userTokenConfig({ getState })
    );

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    errDispatch(error, PRODUCT_DELETE_FAIL, dispatch);
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  // const {
  //   name,
  //   price,
  //   image: '/images/sample.jpg',
  //   brand,
  //   category,
  //   countInStock,
  //   numReviews,
  //   description,
  // } = product;

  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const { data } = await axios.post(
      `${baseUrl}/api/products`,
      product,
      userTokenConfig({ json: 1, getState })
    );

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errDispatch(error, PRODUCT_CREATE_FAIL, dispatch);
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const { data } = await axios.put(
      `${baseUrl}/api/products/${product._id}`,
      product,
      userTokenConfig({ json: 1, getState })
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    errDispatch(error, PRODUCT_UPDATE_FAIL, dispatch);
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });

      await axios.post(
        `${baseUrl}/api/products/${productId}/reviews`,
        review,
        userTokenConfig({ json: 1, getState })
      );

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      errDispatch(error, PRODUCT_CREATE_REVIEW_FAIL, dispatch);
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(
      `${baseUrl}/api/products/top`,
      userTokenConfig({ auth: 0 })
    );

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errDispatch(error, PRODUCT_TOP_FAIL, dispatch);
  }
};

export const listNavCategory = () => async (dispatch) => {
  try {
    dispatch({ type: NAV_CATEGORY_REQUEST });

    const { data } = await axios.get(
      `${baseUrl}/api/products/category`,
      userTokenConfig({ auth: 0 })
    );

    dispatch({
      type: NAV_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    errDispatch(error, NAV_CATEGORY_FAIL, dispatch);
  }
};
