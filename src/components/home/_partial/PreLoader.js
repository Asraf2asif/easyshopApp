import React from 'react';
import ContentLoader from 'react-content-loader';

export const PreLoader = () => {
  return (
    <ContentLoader
      width={255}
      height={492}
      speed={2}
      className='my-3'
      // style={{
      //   border: '1px solid rgba(0,0,0,.125)',
      //   borderRadius: '.25rem',
      // }}
    >
      {/* <rect
        x='0'
        y='18'
        width='254'
        height='474'
        style={{ fill: 'none', stroke: 'rgb(18, 21, 7)', strokeWidth: '2px' }}
      ></rect> */}

      <rect
        x='14'
        y='18'
        width='221'
        height='230'
        style={{ fill: 'rgb(216, 216, 216)' }}
      ></rect>
      <rect
        x='14'
        y='18'
        width='221'
        height='230'
        style={{ fill: 'rgb(216, 216, 216)' }}
      ></rect>
      <rect
        x='14'
        y='268'
        width='221'
        height='36'
        style={{ fill: 'rgb(216, 216, 216)' }}
      ></rect>
      <rect
        x='14'
        y='319'
        width='221'
        height='36'
        style={{ fill: 'rgb(216, 216, 216)' }}
      ></rect>
      <rect
        x='14'
        y='375'
        width='221'
        height='36'
        style={{ fill: 'rgb(216, 216, 216)' }}
      ></rect>
      <rect
        x='14'
        y='433'
        width='157'
        height='36'
        style={{ fill: 'rgb(216, 216, 216)' }}
      ></rect>
      <rect
        x='152'
        y='435'
        width='81'
        height='36'
        style={{ fill: 'rgb(216, 216, 216)' }}
      ></rect>
    </ContentLoader>
  );
};
