import React from 'react';

export const Switch = ({ labelTxt, ...others }) => {
  return (
    <div className='switches'>
      <input type='checkbox' {...others} />
      <label htmlFor={others.id}>
        <span className='switch-control'>
          <span className='on-state'>
            <i className='icon-on fa-solid fa-check' />
            <span className='control-text'>{labelTxt}</span>
          </span>
          <span className='off-state'>
            <span className='control-text'>
              {labelTxt === 'True'
                ? 'False'
                : /is/i.test(labelTxt) === true
                ? labelTxt
                : `${labelTxt}`}
            </span>
            {/is/i.test(labelTxt) === false && (
              <i className='fa-xmark fa-solid' />
            )}
          </span>
        </span>
      </label>
    </div>
  );
};
