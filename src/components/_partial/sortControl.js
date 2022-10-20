import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export const SortControl = ({
  sort,
  sortFields,
  keyword,
  keyName,
  pageNumber,
  routeAdmin = null,
  route = null,
}) => {
  const sortField = sort || '0';
  const history = useNavigate();
  const sortFieldSelected =
    sortField &&
    sortFields.filter((field) => field.field === sortField.replace('-', ''))[0];

  const onSortFieldChange = (e) => {
    const sortField = e.target.value;
    const mainRoute = routeAdmin ? `admin/${routeAdmin}` : `${route}`;
    let redirectUrl =
      keyword === '' && keyName === ''
        ? `/${mainRoute}/${sortField}`
        : `/search/${mainRoute}/${keyword}/${keyName}/${sortField}`;
    if (pageNumber && pageNumber > 0) {
      redirectUrl += '/' + pageNumber;
    }
    history(redirectUrl);
  };
  return (
    <>
      <Form.Control
        size='sm'
        as='select'
        name='sort_condition'
        value={sortField}
        onChange={onSortFieldChange}
      >
        <option value='0'>
          {`.... ${
            sortFieldSelected && sortFieldSelected.title
              ? sortFieldSelected.title
              : '...'
          } `}
        </option>
        {sortFields.slice(1).map(function ({ field, title }) {
          return (
            <option
              key={field}
              value={field === sortField ? '-' + field : field}
            >
              {field === sortField ? title + ' (Desc)' : title}
            </option>
          );
        })}
      </Form.Control>
      <i
        className={`sort-type-indicator fa-solid ${
          sortField && sortField.indexOf('-') !== -1
            ? 'fa-arrow-up-wide-short'
            : 'fa-arrow-down-short-wide'
        }`}
      />
    </>
  );
};
