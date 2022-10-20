import React from 'react';
import { ProductBtnS } from './info/productBtns';
import { ProductImg } from './info/productImg';

export const Info = ({ product }) => {
  const { image, images, name } = product;
  return (
    <>
      <ProductImg {...{ image, images, name }} />
      <ProductBtnS {...{ product }} />
    </>
  );
};
