import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deliverOrder,
  unDeliverOrder,
  getOrderDetails,
  payOrder,
  deleteOrder,
} from '../redux/actions';
import Loader from '../../_partial/Loader';
import Message from '../../_partial/Message';
import {
  ORDER_DELETE_RESET,
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
  ORDER_UNDELIVER_RESET,
} from '../../../redux/constants';
import { AdminListBtn } from '../../admin/_partial/AdminListBtn';
import { PayPalButton } from 'react-paypal-button-v2';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

export const MarkUndelivered = ({ userInfo, order, deliveredBy }) => {
  const dispatch = useDispatch();

  const unDeliverHandler = (order) => {
    dispatch(unDeliverOrder(order));
  };

  return (
    <>
      <Message variant='success' fadeTimeout={false} className='mb-2'>
        Your product has been delivered
      </Message>
      <Message variant='info' fadeTimeout={false}>
        Don't forget to give your feedback
      </Message>

      {userInfo.isAdmin === true && (
        <>
          <AdminListBtn
            {...{
              btnProps: {
                variant: 'danger',
                onClick: () => unDeliverHandler(order),
                className: 'mt-2 button-6 rounded-pill center-x-absolute',
              },
              iconProps: {
                className: 'btn-icon fa-solid fa-circle-exclamation',
              },
              btnText: 'Mark As Undelivered',
            }}
          />
          {deliveredBy && (
            <p className='text-black-50 text-center'>
              Marked By: {deliveredBy}
            </p>
          )}
        </>
      )}
    </>
  );
};

export const MarkDelivered = ({ userInfo, order }) => {
  const dispatch = useDispatch();

  const deliverHandler = (order) => {
    dispatch(deliverOrder(order));
  };

  return (
    <>
      <Message variant='success' fadeTimeout={false} className='mb-2'>
        Thank you for your purchase
      </Message>
      <Message variant='info' fadeTimeout={false}>
        Your product will be delivered soon
      </Message>

      {userInfo.isAdmin === true && (
        <>
          <AdminListBtn
            {...{
              btnProps: {
                variant: 'success',
                onClick: () => deliverHandler(order),
                className: 'mt-2 button-6 rounded-pill center-x-absolute',
              },
              iconProps: {
                className: 'btn-icon fa-solid fa-check',
              },
              btnText: 'Mark As Delivered',
            }}
          />
        </>
      )}
    </>
  );
};

export const Control = React.memo(({ sdkReady, order, loading, error }) => {
  const {
    loading: loadingPay,
    success: successPay,
    error: payError,
  } = useSelector((state) => state.orderPay);

  const { loading: userDetailsGetting, user: userInfo } = useSelector(
    (state) => state.userDetails
  );

  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: deliverError,
  } = useSelector((state) => state.orderDeliver);

  const {
    loading: loadingUnDeliver,
    success: successUnDeliver,
    error: unDeliverError,
  } = useSelector((state) => state.orderUnDeliver);

  const {
    loading: loadingOrderDelete,
    success: successOrderDelete,
    error: orderDeleteError,
  } = useSelector((state) => state.orderDelete);

  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  const [isPaid, setIsPaid] = useState((order && order.isPaid) || false);
  const [isDelivered, setIsDelivered] = useState(
    (order && order.isDelivered) || false
  );
  const [deliveredBy, setDeliveredBy] = useState(
    (order && order.deliveredBy && order.deliveredBy.name) || null
  );

  useEffect(() => {
    if (successPay === true) {
      dispatch({ type: ORDER_PAY_RESET });
      setIsPaid(true);
    }
    if (successDeliver === true) {
      dispatch({ type: ORDER_DELIVER_RESET });
      setIsDelivered(true);
      if (userInfo) setDeliveredBy(userInfo.name);
    }
    if (successUnDeliver === true) {
      dispatch({ type: ORDER_UNDELIVER_RESET });
      setIsDelivered(false);
    }
    if (successOrderDelete === true) {
      let ref = location.search
        ? location.search.slice(1).split('=')[0] === 'ref'
          ? location.search.split('=')[1]
          : null
        : null;
      history(ref ? '/profile' : '/');
      dispatch({ type: ORDER_DELETE_RESET });
    }
  }, [successPay, successUnDeliver, successDeliver, successOrderDelete]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order._id, paymentResult));
  };

  const deleteOrderHandler = (id) => {
    if (window.confirm('Are you sure, you want to remove this order?')) {
      dispatch(deleteOrder(id));
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <>
      <Message variant='danger' fadeTimeout={false}>
        {error}
      </Message>
    </>
  ) : ((order && order.user && order.user._id === userInfo._id) ||
      userInfo.isAdmin === true) &&
    !isPaid ? (
    <>
      {loadingPay && <Loader />}
      {!sdkReady ? (
        <Loader />
      ) : (
        <PayPalButton
          amount={order.totalPrice}
          onSuccess={successPaymentHandler}
        />
      )}
      {payError && <Message variant='danger'>{payError}</Message>}

      {order && order.user && order.user._id === userInfo._id && (
        <>
          {loadingOrderDelete && <Loader />}
          <AdminListBtn
            {...{
              btnProps: {
                variant: 'link',
                onClick: () => deleteOrderHandler(order && order._id),
                className:
                  'button-6 float-right mt-2 mt-3 text-danger text-decoration-none',
              },
              iconProps: {
                className: 'btn-icon fa-solid fa-circle-exclamation',
              },
              btnText: 'Delete Order',
            }}
          />
          {orderDeleteError && (
            <Message variant='danger'>{orderDeleteError}</Message>
          )}
        </>
      )}
    </>
  ) : isPaid ? (
    !isDelivered ? (
      <>
        {loadingDeliver && <Loader />}
        {deliverError && <Message variant='danger'>{deliverError}</Message>}
        <MarkDelivered {...{ userInfo, order }} />
      </>
    ) : isDelivered ? (
      <>
        {loadingUnDeliver && <Loader />}
        {unDeliverError && <Message variant='danger'>{unDeliverError}</Message>}
        <MarkUndelivered {...{ userInfo, order, deliveredBy }} />
      </>
    ) : null
  ) : null;
});
