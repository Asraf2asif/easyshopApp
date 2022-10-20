import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, dt }) => {
  let colorSchreme = [
    '#DFDFDF',
    '#EB2228',
    '#FA6837',
    '#FFAE38',
    '#87D44A',
    '#26B539',
  ];

  return (
    <>
      {Array.apply(null, Array(5)).map((_, idx) => {
        idx = idx + 1;

        return (
          <i
            key={idx}
            style={{ color: colorSchreme[Math.floor(value)] }}
            className={
              value >= idx
                ? 'fas fa-star'
                : value >= idx - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        );
      })}

      <span className={`fa-icon-size-sm text-black-50 ${dt ? 'mx-4' : 'mx-2'}`}>
        {text && `(${text})`}
      </span>
    </>
  );
};

// Rating.defaultProps = { color: '#F8E825' };

Rating.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  dt: PropTypes.bool,
};

export default Rating;
