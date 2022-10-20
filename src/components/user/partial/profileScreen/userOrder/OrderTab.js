import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { formateDate } from '../../../../../util/helperFunct';
import Message from '../../../../_partial/Message';

export const OrderTab = ({ title, order }) => {
  const tableRow = 6;
  return (
    <>
      {order.length > 0 ? (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>DATE</th>
              <th>PRICE</th>
              {(title === 'Not delivered' || title === 'Delivered') && (
                <th>PAID AT</th>
              )}
              {title === 'Delivered' && <th>DELIVERED AT</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {order
              .slice(0, tableRow)
              .map(({ _id, createdAt, totalPrice, paidAt, deliveredAt }) => (
                <tr key={_id}>
                  <td>{formateDate(createdAt)}</td>
                  <td>{totalPrice}</td>
                  {(title === 'Not delivered' || title === 'Delivered') && (
                    <td>{formateDate(paidAt)}</td>
                  )}
                  {title === 'Delivered' && <td>{formateDate(deliveredAt)}</td>}
                  <td>
                    <LinkContainer to={`/order/${_id}?ref=profile`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <Message variant='info' fadeTimeout='false'>
          No {title} order
        </Message>
      )}
    </>
  );
};
