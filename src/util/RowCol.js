import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NestedTag } from './helperFunct';

const RowCol = ({ children, colsProps = [null], ...otherProps }) => {
  return (
    <NestedTag
      tag={{ parentTag: Row, childTag: Col }}
      tagsProps={colsProps}
      {...{ children, ...otherProps }}
    />
  );
};

export default RowCol;
