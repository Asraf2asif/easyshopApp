import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ curStep }) => {
  const isStep1 = curStep >= 0;
  const isStep2 = curStep >= 1;
  const isStep3 = curStep === 2;

  const data = [
    {
      step: isStep1,
      route: '/login?redirect=/shipping',
      linkText: 'Sign In',
      key: 1,
    },
    { step: isStep2, route: '/shipping', linkText: 'Shipping', key: 2 },
    { step: isStep3, route: '/payment', linkText: 'Payment', key: 3 },
  ];

  const curStepExclusive = curStep + 1;

  return (
    <section className='checkout-step-indicator mt-md-n4'>
      {data.map(({ step, route, linkText, key }) => {
        const currentORcomplete =
          key === curStepExclusive ? 'current' : step ? 'complete' : '';

        return (
          <div key={key} className={`step ${currentORcomplete}`}>
            <div className='step-icon'>
              {currentORcomplete !== 'complete' ? (
                key
              ) : (
                <i className='fa-solid fa-check' />
              )}
            </div>
            {currentORcomplete !== '' ? (
              <Link to={route}>{linkText}</Link>
            ) : (
              <span>{linkText}</span>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default CheckoutSteps;
