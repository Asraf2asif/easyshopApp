import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export const IdSearchControl = ({
  routeAdmin = null,
  route = null,
  field,
  condition = '',
  keyword,
  keyName,
}) => {
  const [srcId, setSrcId] = useState(
    keyword && keyName === field ? keyword.replace(/.*<.*>/, '') : ''
  );
  const history = useNavigate();
  const onSearch = (e) => {
    e.preventDefault();
    const conditionUrl = condition !== '' ? `${condition}<,>` : '';
    const mainRoute = routeAdmin ? `admin/${routeAdmin}` : `${route}`;
    let redirectUrl =
      srcId === ''
        ? `/${mainRoute}`
        : `/search/${mainRoute}/${conditionUrl}${srcId}/${field}`;
    history(redirectUrl);
  };
  return (
    <Form onSubmit={onSearch} className='ml-lg-n4'>
      <Form.Control
        size='sm'
        className='mb-3 pr-4'
        type='text'
        name='srchValue'
        style={{ width: 'calc(100% - 25px)' }}
        value={srcId}
        onChange={(e) => setSrcId(e.target.value)}
        placeholder={`Search by ${field.replace(/_/g, '')}`}
      />
      <Button
        variant='primary'
        className='pointer bg-white border-secondary position-absolute px-2 py-1 text-black-50'
        size='sm'
        type='submit'
        onClick={onSearch}
        style={{
          top: '-1px',
          right: '14px',
          fontSize: '1.3em',
          borderRadius: '50%',
        }}
      >
        <i className='fa-solid fa-magnifying-glass pr-1' />
      </Button>
    </Form>
  );
};
