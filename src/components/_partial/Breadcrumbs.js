import React from 'react';
import { Link } from 'react-router-dom';
import { capitalCase } from '../../util/helperFunct';

const Breadcrumbs = React.memo(({ urls }) => {
  return (
    urls.length >= 1 && (
      <ul className='breadcrumb shadow-small p-0 mb-4'>
        <li>
          <Link to='/'>
            <i className='fa-solid fa-house'></i>
          </Link>
        </li>
        {urls.map(({ link = null, text = 'url' }, idx) => (
          <li key={idx}>
            <Link to={link ? link : '#'}>{capitalCase(text)}</Link>
          </li>
        ))}
      </ul>
    )
  );
});

export default Breadcrumbs;
