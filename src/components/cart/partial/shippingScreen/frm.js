import React from 'react';
import ShippingAddressInput from './frm/shippingAddressInput';
import PaymentMethodInput from './frm/paymentMethodInput';

export const Frm = ({
  shippingAddressVal,
  submitHandler,
  paymentMethod,
  setPaymentMethod,
  curStep,
  shippingAddressSet,
}) => {
  return (
    <form onSubmit={submitHandler} className='bg-black-i px-4 px-sm-5'>
      <div>
        <p
          className='mt-4 text-center text-dark'
          style={{
            fontSize: '2em',
            fontWeight: 'bold',
          }}
        >
          {curStep === 1 ? (
            <i className='fa-solid fa-truck-fast fa-icon-size-sm' />
          ) : curStep === 2 ? (
            <i className='fa-regular fa-credit-card fa-icon-size-sm' />
          ) : (
            ''
          )}
          {curStep === 1 ? ' Shipping' : curStep === 2 ? ' Payment Method' : ''}
        </p>
        <hr />
      </div>

      {curStep === 1 && (
        <ShippingAddressInput
          {...{
            shippingAddressVal,
            shippingAddressSet,
          }}
        />
      )}

      {curStep === 2 && (
        <PaymentMethodInput
          {...{
            paymentMethod,
            setPaymentMethod,
          }}
        />
      )}
      <div className='text-center'>
        <button type='submit' className='button-6 rounded-pill'>
          Continue
        </button>
      </div>
    </form>
  );
};
