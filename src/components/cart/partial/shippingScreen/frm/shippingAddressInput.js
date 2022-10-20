import React from 'react';
import { capitalCase } from '../../../../../util/helperFunct';
import Input from '../../../../../util/Input';
import RowCol from '../../../../../util/RowCol';

const ShippingAddressInput = ({ shippingAddressVal, shippingAddressSet }) => {
  const { address, city, postalCode, country } = shippingAddressVal;
  const { setAddress, setCity, setPostalCode, setCountry } = shippingAddressSet;
  return (
    <>
      <RowCol colsProps={[{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }]}>
        <Input
          className='shadow-small'
          name='address'
          faProps={{ className: 'fa fa-location-dot fa-fw' }}
          value={address}
          required
          onChange={({ target: { value } }) => {
            setAddress(capitalCase(value));
          }}
        />

        <Input
          className='shadow-small'
          name='city'
          faProps={{ className: 'fa fa-city fa-fw' }}
          value={city}
          required
          onChange={({ target: { value } }) => {
            setCity(capitalCase(value));
          }}
        />
      </RowCol>

      <RowCol colsProps={[{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }]}>
        <Input
          className='shadow-small'
          name='postalCode'
          faProps={{ className: 'fa fa-signs-post fa-fw' }}
          value={postalCode}
          required
          onChange={({ target: { value } }) => {
            setPostalCode(value);
          }}
        />

        <Input
          className='shadow-small'
          name='Country'
          faProps={{ className: 'fa fa-flag fa-fw' }}
          value={country}
          required
          onChange={({ target: { value } }) => {
            setCountry(capitalCase(value));
          }}
        />
      </RowCol>
    </>
  );
};

export default ShippingAddressInput;
