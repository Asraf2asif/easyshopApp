import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { NestedTag } from './helperFunct';

const ListGroupMap = ({ children, colsProps = [null], ...otherProps }) => {
  return (
    <NestedTag
      tag={{ parentTag: ListGroup, childTag: ListGroup.Item }}
      tagsProps={colsProps}
      {...{ children, ...otherProps }}
    />
  );
};

export default ListGroupMap;
