import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Loader from '../../../_partial/Loader';
import Message from '../../../_partial/Message';
import { OrderTab } from './userOrder/OrderTab';

export const UserOrder = ({ loadingOrders, errorOrders, orders }) => {
  const [key, setKey] = useState('unPaidOrder');

  let unPaidOrder, notDeliveredOrder, deliveredOrder;

  if (orders) {
    unPaidOrder = orders.filter((order) => order.isPaid === false);
    notDeliveredOrder = orders.filter(
      (order) => order.isPaid === true && order.isDelivered === false
    );
    deliveredOrder = orders.filter((order) => order.isDelivered === true);
  }

  return (
    <>
      <h2>My Orders</h2>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant='danger'>{errorOrders}</Message>
      ) : (
        <>
          {orders.length > 0 ? (
            <Tabs
              id='my-orders'
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className='mt-3'
            >
              <Tab eventKey='unPaidOrder' title='Unpaid' className='mr-1 font-weight-bold '>
                <OrderTab title='Unpaid' order={unPaidOrder} />
              </Tab>

              <Tab eventKey='notDeliveredOrder' title='Not delivered' className='mr-1 font-weight-bold '>
                <OrderTab title='Not delivered' order={notDeliveredOrder} />
              </Tab>

              <Tab eventKey='deliveredOrder' title='Delivered' className='mr-1 font-weight-bold '>
                <OrderTab title='Delivered' order={deliveredOrder} />
              </Tab>
            </Tabs>
          ) : (
            <Message variant='info' fadeTimeout='false'>
              No order
            </Message>
          )}
        </>
      )}
    </>
  );
};
