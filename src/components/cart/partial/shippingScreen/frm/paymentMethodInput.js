import React from 'react';
import { Col, Form } from 'react-bootstrap';

const paymentMethodData = [
  {
    id: 'PayPal',
    text: 'PayPal or Credit Card',
  },
  {
    id: 'Stripe',
    text: 'Other Methods coming soon',
    disabled: true,
  },
];

const PaymentMethodInput = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <fieldset className='my-4 mx-2 mx-lg-0'>
      <legend as='legend'>Select Method</legend>
      <Col>
        {paymentMethodData.map(({ id, text, disabled = false }) => (
          <Form.Check key={id} type='radio' id={id} className='pb-2'>
            <Form.Check.Input
              type='radio'
              className='pointer'
              value={id}
              name='paymentMethod'
              checked={paymentMethod === id}
              disabled={disabled === true}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            />
            <Form.Check.Label className='pointer'>{text}</Form.Check.Label>
          </Form.Check>
        ))}
      </Col>
    </fieldset>
  );
};

export default PaymentMethodInput;
