import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getOrderDetails, payOrder } from './redux/actions';
import Loader from '../_partial/Loader';
import Message from '../_partial/Message';
import {
  ORDER_DELIVER_RESET,
  ORDER_UNDELIVER_RESET,
  ORDER_PAY_RESET,
} from '../../redux/constants';
import Meta from '../../util/meta';
import Breadcrumbs from '../_partial/Breadcrumbs';
import { cartCalculation, formateDate, isEmpty, userTokenConfig } from '../../util/helperFunct';
import { CartAmount } from '../home/_partial/Header/cartDetails/cartAmount';
import { CartItems } from '../home/_partial/Header/cartDetails/cartItems';
import { Control } from './partial/orderControl';

const baseUrl = process.env.REACT_APP_BASE_URL;

const addPayPalScript = async (setSdkReady) => {
  const { data: clientId } = await axios.get(
    `${baseUrl}/api/config/paypal`,
    userTokenConfig({ auth: 0 })
  );
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
  script.async = true;
  script.onload = () => {
    setSdkReady(true);
  };
  document.body.appendChild(script);
};

const OrderInfoSection = ({ heading, children }) => {
  // class & style
  const sectionClass = 'bg-black-i h-auto mb-2 side-info d-table w-100';
  const sectionName = 'mb-2 text-black-50 font-weight-bold fa-icon-size-md';
  const sectionNamePad = {
    padding: '20px 50px 2px 27px',
  };
  const faCheckClass = 'fa-check fa-solid mr-1 text-dark fa-icon-size-sm';
  const sectionValClass = 'font-weight-bold mb-2';
  const sectionValPad = { padding: '0 20px 15px 50px' };

  return (
    <div className={sectionClass}>
      <p className={sectionName} style={sectionNamePad}>
        <i className={faCheckClass} /> {heading}{' '}
      </p>

      <div className={sectionValClass} style={sectionValPad}>
        {children}
      </div>
    </div>
  );
};

const OrderScreen = React.memo((props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  let { id: idParam } = useParams();
  const [sdkReady, setSdkReady] = useState(false);

  const { loading: userDetailsGetting, user: userInfo } = useSelector(
    (state) => state.userDetails
  );

  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, loading, error } = orderDetails;

  const {
    _id = 'id',
    user,
    orderItems,
    shippingAddress = { address: '', city: '', postalCode: '', country: '' },
    paymentMethod,
    taxPrice,
    shippingPrice,
    isPaid = false,
    createdAt = 'createdAt',
  } = order;

  const { address, city, postalCode, country } = shippingAddress;

  useEffect(() => {
    if (!userInfo) {
      history('/login');
    }

    if (_id !== idParam) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_UNDELIVER_RESET });
      dispatch(getOrderDetails(idParam));
    } else if (!isPaid === true) {
      if (!window.paypal) {
        addPayPalScript(setSdkReady);
      } else {
        setSdkReady(true);
      }
    }
  }, [idParam, _id, isPaid, userInfo]);

  const location = useLocation();

  let ref = location.search
    ? location.search.slice(1).split('=')[0] === 'ref'
      ? location.search.split('=')[1]
      : null
    : null;

  return loading ? (
    <Loader />
  ) : error ? (
    <>
      <Meta title='EasyShop | Order Error' />
      <Message variant='danger' fadeTimeout={false}>
        {error}
      </Message>
    </>
  ) : (
    order &&
    userInfo && (
      <>
        <Meta title='EasyShop | Order Details' />
        <Breadcrumbs
          urls={
            ref !== null
              ? [
                  { link: '/profile', text: ref },
                  {
                    text:
                      createdAt !== 'createdAt'
                        ? formateDate(createdAt)
                        : createdAt,
                  },
                  { text: _id },
                ]
              : [
                  { text: createdAt ? formateDate(createdAt) : 'Date' },
                  { text: _id },
                ]
          }
        />

        <Row className='Two-col-layout mb-5 ml-0 justify-content-center'>
          <Col
            className='form-col pr-lg-2 display-flex flex-direction-column pl-lg-0'
            xl={5}
            lg={6}
            md={8}
            sm={9}
            xs={11}
          >
            <OrderInfoSection heading='Sign In'>
              <p className='mb-0'>
                {user && user.name}, {user && user.email}
              </p>
            </OrderInfoSection>

            <OrderInfoSection heading='Shipping'>
              <p className='mb-2'>
                {address}, {postalCode}
              </p>
              <p className='mb-0'>
                {city}, {country}.
              </p>
            </OrderInfoSection>

            <OrderInfoSection heading='Payment Method'>
              <p className='mb-0'>{paymentMethod}</p>
            </OrderInfoSection>

            <div className='bg-black-i p-5 side-info w-100'>
              <Control {...{ sdkReady, order, loading, error }} />
            </div>
          </Col>

          <Col
            className='pl-lg-0 mt-lg-0 mt-3'
            xl={5}
            lg={6}
            md={8}
            sm={9}
            xs={12}
          >
            <div className='side-info bg-white'>
              {orderItems &&
              !isEmpty(orderItems) &&
              (orderItems === {} || Object.keys(orderItems).length === 0) ? (
                <Message fadeTimeout={false} variant='info'>
                  Your cart is empty
                </Message>
              ) : (
                <>
                  <CartItems
                    {...{
                      cartItems: orderItems || {},
                      notModel: true,
                      order: true,
                    }}
                  />

                  <CartAmount
                    {...{
                      cartCalculationValues: orderItems
                        ? cartCalculation(orderItems, 0, {
                            taxPrice,
                            shippingPrice,
                          })
                        : {},
                      notModel: true,
                    }}
                  />
                </>
              )}
            </div>
          </Col>
        </Row>
      </>
    )
  );
});

export default OrderScreen;
