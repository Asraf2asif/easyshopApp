import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../cart/redux/actions';
import Loader from '../../_partial/Loader';

const AddCart = ({
  product,
  cartItems,
  removeIcon = true,
  standAlone = false,
  carousel = false,
  productPage = false,
}) => {
  const dispatch = useDispatch();
  const { countInStock } = product;
  const addedToCart = cartItems && cartItems[product._id];
  const defaultQty = addedToCart && addedToCart.qty >= 1 ? addedToCart.qty : 0;

  const [qty, setQty] = useState(defaultQty);
  useEffect(() => {
    if (qty !== defaultQty) {
      setQty(defaultQty);
    }
  }, [cartItems, defaultQty, qty]);

  return qty <= 0 ? (
    <>
      {/* add to cart btn */}
      <Button
        onClick={() => {
          if (defaultQty > 0) {
            setQty(defaultQty);
          } else {
            setQty(1);
            dispatch(addToCart(product, 1));
          }
        }}
        variant='info'
        size='sm'
        className='mt-3 rounded-pill button-6 button-6-small'
        type='button'
        disabled={countInStock === 0}
      >
        {countInStock === 0 ? (
          <span>Empty stock</span>
        ) : (
          <span>
            <i className='fa-solid fa-plus pr-2' />
            Add To Cart
          </span>
        )}
      </Button>
    </>
  ) : qty > 0 ? (
    <div
      className={`${
        standAlone
          ? null
          : `flex-center${productPage === true ? '' : ' mt-3'}${
              carousel ? ' ml-auto' : ' ml-3'
            }`
      } `}
    >
      {/* derease qty btn */}
      <div className='align-items-center display-flex position-relative'>
        <Button
          size='sm'
          variant='link'
          onClick={() => {
            if (qty <= 1) {
              setQty(0);
              dispatch(removeFromCart(product._id));
            } else {
              setQty((prevQty) => Number(prevQty) - 1);
              dispatch(addToCart(product, qty - 1));
            }
          }}
          className='button-6-light-active-0 rounded-pill button-6 focus-none p-0'
          style={{
            fontSize: '0.6em',
            ...(!standAlone && {
              marginRight: '-30px',
              marginTop: '13px',
              zIndex: 1,
            }),
          }}
          type='button'
        >
          <i
            className={`fa-solid fa-minus ${
              standAlone ? 'text-black-50' : 'text-white'
            }`}
            style={{
              border: '1px solid white',
              borderRadius: '50%',
              padding: standAlone ? '3.5px 4.5px' : '4px 5px',
              borderColor: standAlone ? 'rgba(0,0,0,.5)' : 'white',
            }}
          />
        </Button>

        {/* qty input  */}
        <Form.Control
          type='number'
          min={0}
          size='sm'
          max={countInStock}
          name={`qty_${product._id}`}
          className={`btn-sm p-0 ${
            !standAlone ? 'bg-info text-white' : ''
          } rounded-pill text-center focus-none`}
          style={{
            width: standAlone ? '40px' : '100px',
            fontSize: standAlone ? '1.1em' : '0.8em',
            maxHeight: '34px',
            ...(standAlone && {
              background: 'transparent',
              border: 'none',
              fontWeight: 'bold',
            }),
          }}
          value={qty}
          onChange={(e) => {
            const { value } = e.target;
            setQty(e.target.value);
            value <= 0 || value > countInStock
              ? dispatch(removeFromCart(product._id))
              : dispatch(addToCart(product, value));
          }}
          placeholder='qty'
        />

        {/* increase qty btn */}
        <Button
          size='sm'
          variant='link'
          onClick={() => {
            if (qty < countInStock) {
              setQty((prevQty) => prevQty + 1);
              dispatch(addToCart(product, qty + 1));
            }
          }}
          className='button-6-light-active-0 rounded-pill button-6 focus-none button-6-light-shadow
            p-0'
          style={{
            fontSize: '1.2em',
            ...(!standAlone
              ? {
                  marginLeft: '-27px',
                  marginTop: '12px',
                }
              : {
                  paddingTop: '1px',
                }),
          }}
          type='button'
        >
          <i
            className={`fa-solid fa-circle-plus ${
              standAlone ? 'text-body' : 'text-white'
            }`}
          />
        </Button>
      </div>
      {/* stock count */}
      {!standAlone && (
        <div
          className='pr-2 fa-icon-size-sm text-black-50'
          style={{
            marginLeft: '27px',
          }}
        >
          ({countInStock}) Stock
        </div>
      )}

      {/* remove item */}
      {removeIcon && (
        <Button
          size='sm'
          variant='link'
          onClick={() => {
            dispatch(removeFromCart(product._id));
            setQty(0);
          }}
          className='button-6-light-active-0 p-0 secondary-info-small rounded-pill button-6'
          type='button'
        >
          <i
            className='fa-regular fa-circle-xmark fa-icon-size'
            style={{
              fontSize: '1.5em',
            }}
          />
        </Button>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default AddCart;
