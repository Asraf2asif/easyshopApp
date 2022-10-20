import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CART_CLEAR_ITEMS } from '../../../../../redux/constants';
import ListGroupMap from '../../../../../util/ListGroupMap';
import RowCol from '../../../../../util/RowCol';

export const CartAmount = ({
  cartCalculationValues,
  hideModel = null,
  notModel = null,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const clearCartHandler = () => {
    dispatch({ type: CART_CLEAR_ITEMS });
  };

  const checkoutHandler = () => {
    history('/login?redirect=/shipping');
    (notModel === null || notModel === false) && hideModel && hideModel();
  };

  const {
    itemsPrice = 0,
    totalItem = 0,
    shippingPrice = 0,
    taxPrice = 0,
    totalPrice = 0,
  } = cartCalculationValues;

  const listGroupStyle = {
    style: {
      fontSize: '1.1em',
      fontWeight: 'bold',
    },
    colsProps: [
      { className: 'text-secondary' },
      { className: 'text-right text-dark' },
    ],
  };

  return (
    <div
      className='mx-auto my-5'
      style={{
        maxWidth: '340px',
      }}
    >
      <div>
        <p
          className='text-center text-dark'
          style={{
            fontSize: '1.5em',
            fontWeight: 'bold',
          }}
        >
          Bill Amount
        </p>
        <hr className='m-0' />
      </div>

      <ListGroupMap
        variant='flush'
        colsProps={[
          {},
          {},
          {},
          {
            style: {
              borderTop: 'double rgb(223 223 223)',
            },
          },
        ]}
      >
        <RowCol {...listGroupStyle}>
          <span>Gross Price</span>
          <span>${itemsPrice}</span>
        </RowCol>

        <RowCol {...listGroupStyle}>
          <span>Shipping</span>
          <span>${shippingPrice}</span>
        </RowCol>

        <RowCol {...listGroupStyle}>
          <span>Tax</span>
          <span>${taxPrice}</span>
        </RowCol>

        <RowCol {...listGroupStyle}>
          <span>Total ({totalItem} items)</span>
          <span>${totalPrice}</span>
        </RowCol>
      </ListGroupMap>

      {(notModel === null || notModel === false) && (
        <RowCol className='my-3'>
          <Button
            type='button'
            size='sm'
            variant='outline-danger'
            className='btn-block button-6 m-0 text-danger bg-transparent'
            onClick={clearCartHandler}
          >
            Empty Cart
          </Button>

          <Button
            type='button'
            size='sm'
            variant='info'
            className='btn-block button-6 m-0'
            onClick={checkoutHandler}
          >
            Place Order
          </Button>
        </RowCol>
      )}
    </div>
  );
};
