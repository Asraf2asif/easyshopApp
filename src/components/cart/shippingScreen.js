import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { saveShippingAddress, savePaymentMethod } from './redux/actions';
import { ORDER_CREATE_RESET } from '../../redux/constants';
import { createOrder } from '../order/redux/actions';
import CheckoutSteps from './partial/shippingScreen/checkoutSteps';
import { Frm } from './partial/shippingScreen/frm';
import Meta from '../../util/meta';
import { cartCalculation } from '../../util/helperFunct';
import Breadcrumbs from '../_partial/Breadcrumbs';
import Message from '../_partial/Message';
import { CartItems } from '../home/_partial/Header/cartDetails/cartItems';
import { CartAmount } from '../home/_partial/Header/cartDetails/cartAmount';
import { logout } from '../user/redux/actions';

const ShippingScreen = React.memo((props) => {
  const {
    error: cartItemError,
    shippingAddress = {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
    paymentMethod: cartPaymentMethod = 'PayPal',
    cartItems = {},
  } = useSelector((state) => state.cart);

  const cartItemList = Object.values(cartItems);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [curStep, setCurStep] = useState(1);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();

  const path = location.pathname;

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = cartCalculation(
    cartItems,
    0
  );

  const {
    order,
    success,
    error: orderError,
  } = useSelector((state) => state.orderCreate);

  const submitHandler = (e) => {
    if (e) e.preventDefault();
    if (curStep === 1) {
      dispatch(
        saveShippingAddress({
          address,
          city,
          postalCode,
          country,
        })
      );
      history('/payment');
      setCurStep(2);
    }
    if (curStep === 2) {
      dispatch(savePaymentMethod(paymentMethod));
      dispatch(
        createOrder({
          orderItems: cartItemList,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        })
      );
    }
  };

  useEffect(() => {
    setCurStep(path === '/shipping' ? 1 : path === '/payment' ? 2 : '1');

    if ((curStep === 1 || curStep === 2) && cartItemList.length === 0) {
      history('/');
    }

    if (curStep === 2 && shippingAddress.address === '') {
      history('/shipping');
    }

    if (curStep === 2) {
      if (success) {
        history(`/order/${order._id}`);
        dispatch({ type: ORDER_CREATE_RESET });
      }
    }
  }, [
    history,
    path,
    curStep,
    shippingAddress,
    success,
    cartPaymentMethod,
    dispatch,
    order,
    cartItemList,
  ]);

  // const classes = authStl(props);

  const shippingAddressVal = { address, city, postalCode, country };

  const shippingAddressSet = {
    setAddress,
    setCity,
    setPostalCode,
    setCountry,
  };

  const { loading: userDetailsGetting, user: userInfo } = useSelector(
    (state) => state.userDetails
  );

  return (
    <>
      <Meta title='EasyShop | Shipping' />
      <Breadcrumbs urls={[{ text: 'shipping' }]} />
      <CheckoutSteps curStep={curStep} />

      <Row className='Two-col-layout mb-5 ml-0 justify-content-center'>
        <Col
          className='form-col pr-lg-2 display-flex flex-direction-column pl-lg-0'
          xl={5}
          lg={6}
          md={11}
          sm={10}
          xs={12}
        >
          {userInfo && (
            <div className='bg-black-i h-auto mb-2 side-info d-table w-100'>
              <p
                className='mb-2 text-black-50 font-weight-bold fa-icon-size-md'
                style={{
                  padding: '20px 50px 2px 27px',
                }}
              >
                <i
                  className='fa-check fa-solid mr-1 text-dark fa-icon-size-sm'
                />{' '}
                Sign In{' '}
                <i
                  className='fa-pen-to-square fa-regular ml-2 text-dark pointer fa-icon-size-sm'
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout({ cartClear: false }));
                    history(
                      `/login?redirect=/${
                        curStep === 1
                          ? 'shipping'
                          : curStep === 2
                          ? 'payment'
                          : '/'
                      }`
                    );
                  }}
                />
              </p>
              <div style={{ padding: '0 20px 15px 50px' }}>
                <p className='font-weight-bold mb-2'>
                  {userInfo.name}, {userInfo.email}
                </p>
              </div>
            </div>
          )}

          {curStep === 2 && (
            <div className='bg-black-i h-auto mb-2 side-info d-table w-100'>
              <p
                className='mb-2 text-black-50 font-weight-bold fa-icon-size-md'
                style={{
                  padding: '20px 50px 2px 27px',
                }}
              >
                <i
                  className='fa-check fa-solid mr-1 text-dark fa-icon-size-sm'
                />{' '}
                Shipping{' '}
                <i
                  className='fa-pen-to-square fa-regular ml-2 text-dark pointer fa-icon-size-sm'
                  onClick={() => {
                    history('/shipping');
                  }}
                />
              </p>

              <div style={{ padding: '0 20px 15px 50px' }}>
                <p className='font-weight-bold mb-2'>
                  {address}, {postalCode}
                </p>
                <p className='font-weight-bold'>
                  {city}, {country}.
                </p>
              </div>
            </div>
          )}

          <Frm
            {...{
              shippingAddressVal,
              paymentMethod,
              submitHandler,
              curStep,
              shippingAddressSet,
              setPaymentMethod,
            }}
          />
        </Col>

        <Col
          className='pl-lg-0 mt-lg-0 mt-3'
          xl={5}
          lg={6}
          md={11}
          sm={10}
          xs={12}
        >
          <div className='side-info bg-white'>
            {cartItemError ? (
              <Message fadeTimeout={false} variant='danger'>
                {cartItemError}
              </Message>
            ) : cartItems === {} || Object.keys(cartItems).length === 0 ? (
              <Message fadeTimeout={false} variant='info'>
                Your cart is empty
              </Message>
            ) : (
              <>
                <CartItems {...{ cartItems, notModel: true }} />

                <CartAmount
                  {...{
                    cartCalculationValues: cartCalculation(cartItems),
                    notModel: true,
                  }}
                />
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
});

export default ShippingScreen;
