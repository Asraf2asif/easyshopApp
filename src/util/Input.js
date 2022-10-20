import React from 'react';
import { inputType, unCamelCase } from './helperFunct';

const Input = React.memo((props) => {
  let {
    lbText,
    withInfo,
    lbProps,
    info,
    showPassProps,
    faProps,
    ...otherProps
  } = props;
  try {
    if (!otherProps.name) {
      otherProps.name = otherProps.type;
    }
    lbProps = { htmlFor: otherProps.name, ...lbProps };
    if (!otherProps.type) {
      otherProps.type = inputType.includes(otherProps.name.toLowerCase())
        ? otherProps.name
        : 'text';
    }
    if (!lbText) {
      lbText = unCamelCase(otherProps.name || otherProps.type);
    }
    if (!otherProps.placeholder) {
      otherProps.placeholder = `Enter ${unCamelCase(
        otherProps.name || otherProps.type
      )}`;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div
      className={`input-custom${info ? ' info' : ''}${
        withInfo ? ' with-info' : ''
      }${faProps ? ' fa-props' : ''}${
        withInfo && showPassProps.editPassword ? ' edit-password' : ''
      }${!info && withInfo ? ' editing' : ''}`}
      onClick={info ? info.onClick : null}
    >
      {info ? (
        <div className='info-heading'>
          {Object.keys(info)[0].capitalize()}{' '}
          <i
            className='fa-solid fa-pen-to-square fa-fw'
            onClick={info.onClick}
          ></i>
        </div>
      ) : (
        lbText && <label {...lbProps}>{lbText}</label>
      )}

      <div className='input-holder'>
        {showPassProps.editPassword && (
          <div className='icon show-pass'>
            <i
              className={` fa-solid fa-${
                otherProps.type === 'password' ? 'eye' : 'eye-slash'
              } fa-fw`}
              onClick={showPassProps.onClick}
            ></i>
          </div>
        )}

        <div className='icon'>
          <i
            className={
              info || !props.withInfo
                ? faProps.className
                : 'fa-solid fa-eject fa-fw'
            }
            onClick={faProps.onClick}
          ></i>
        </div>

        {info ? (
          <div className='user-info'>
            {info[Object.keys(info)[0]] === 'password' ? (
              <>
                {[...Array(10).keys()].map((itm, idx) => (
                  <i
                    key={idx}
                    className='fa-regular fa-circle-dot fa-fw'
                    onClick={info.onClick}
                  ></i>
                ))}
              </>
            ) : (
              info[Object.keys(info)[0]]
            )}
          </div>
        ) : (
          <input onFocus={(e) => e.currentTarget.select()} {...otherProps} />
        )}
      </div>
    </div>
  );
});

Input.defaultProps = {
  lbText: null,
  lbProps: {},
  withInfo: false,
  faProps: {},
  showPassProps: {},
};

export default Input;
