import React from 'react';
import { Badge, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartCalculation } from '../../../../util/helperFunct';
import { setModelVisibility } from '../../../cart/redux/actions';
import Message from '../../../_partial/Message';
import { CartAmount } from './cartDetails/cartAmount';
import { CartItems } from './cartDetails/cartItems';

const CartDetails = () => {
  const dispatch = useDispatch();
  const {
    error,
    cartItems = {},
    modelVisibility = false,
  } = useSelector((state) => state.cart);

  const { totalItem } = cartCalculation(cartItems, 1);

  const showModel = () => {
    dispatch(setModelVisibility(true));
  };

  const hideModel = () => {
    dispatch(setModelVisibility(false));
  };

  return (
    <>
      <span onClick={showModel} className='pointer position-relative'>
        <i className='fa-solid fa-cart-shopping pointer fa-icon-size pr-1' />
        {totalItem > 0 && <Badge
          pill
          bg='danger'
          className='text-white position-absolute'
          style={{ top: '-17px', right: '-5px' }}
        >
          {totalItem}
        </Badge>}
      </span>

      <Modal
        show={modelVisibility}
        onHide={hideModel}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            <i className='fa-solid fa-cart-arrow-down  fa-icon-size-xs' /> Cart
            Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error ? (
            <Message fadeTimeout={false} variant='danger'>
              {error}
            </Message>
          ) : cartItems === {} || Object.keys(cartItems).length === 0 ? (
            <Message fadeTimeout={false} variant='info'>
              Your cart is empty
            </Message>
          ) : (
            <>
              <CartItems {...{ cartItems }} />

              <CartAmount
                {...{
                  cartCalculationValues: cartCalculation(cartItems),
                  hideModel,
                }}
              />
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CartDetails;
