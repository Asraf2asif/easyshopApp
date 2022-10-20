import React from 'react';
import { Helmet } from 'react-helmet';
import { properCase } from './helperFunct';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{properCase(title)}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Easyshop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electroincs',
};

export default Meta;
