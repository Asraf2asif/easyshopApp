import React, { useEffect, useState } from 'react';
import { Form, ListGroup, Button } from 'react-bootstrap';
import { capitalCase } from '../../../util/helperFunct';
import { Switch } from '../switch';

export const FilterForm = React.memo(
  ({
    valObj,
    field,
    cndtnChangeHandler,
    idx,
    srchCndtns,
    rangeIdx,
    frmData,
    setFrmData,
    list = [],
    autoFillName,
    setAutoFillName,
  }) => {
    const [fieldValList, setFieldValList] = useState([]);

    const closeAutoFill = () => {
      setFieldValList([]);
      setAutoFillName('');
    };

    useEffect(() => {
      const handleEsc = (event) => {
        if (event.keyCode === 27) {
          closeAutoFill();
        }
      };

      window.addEventListener('keydown', handleEsc);

      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
    }, []);

    const { name: fieldName, type: fieldType } = valObj;
    const cndtnsKeys = Object.keys(srchCndtns);

    const handleChange = function (event, condition = {}) {
      const cndtnKey = condition !== {} && Object.keys(condition)[0];
      const cndtnType =
        fieldType === 'num' || fieldType === 'date' || fieldType === 'bool';

      const cndtn = (state) =>
        cndtnKey &&
        !state[cndtnKey] &&
        cndtnType && {
          [cndtnKey]: condition[cndtnKey],
        };

      const { name, value } = event.target;

      if (list[field] && value !== '') {
        setFieldValList(
          list[field].filter((val) => new RegExp(value).test(val))
        );
        setAutoFillName(field);
      } else {
        closeAutoFill();
      }

      setFrmData((prevState) => ({
        ...prevState,
        [name]: fieldType === 'bool' ? event.target.checked : value,
        ...cndtn(prevState),
      }));
    };

    const nrmDateOrNumName =
      fieldType === 'date'
        ? `${field}_date`
        : fieldType === 'num'
        ? `${field}_num`
        : field;

    const isBoolRegex = /(is)(.+)/;

    return (
      <>
        {fieldType === 'num' || fieldType === 'date' ? (
          <>
            <Form.Control
              size='sm'
              as='select'
              name={`${field}_condition`}
              value={frmData[`${field}_condition`] || cndtnsKeys[0]}
              className='px-1'
              style={{ width: '75px' }}
              onChange={(e) => {
                handleChange(e);
                cndtnChangeHandler(e, idx);
              }}
            >
              <option value='0' disabled>
                Conditions...
              </option>
              {Object.entries(srchCndtns).map(([keyName, value]) => (
                <option key={keyName} value={keyName}>
                  {value}
                </option>
              ))}
              {fieldType === 'date' && <option value='range'>Range</option>}
            </Form.Control>
            <br />
            {rangeIdx.indexOf(idx) === -1 ? (
              <Form.Control
                size='sm'
                type='text'
                name={nrmDateOrNumName}
                value={frmData[nrmDateOrNumName] || ''}
                className='px-2'
                onChange={(e) =>
                  handleChange(e, {
                    [`${field}_condition`]: cndtnsKeys[0],
                  })
                }
                placeholder={`${
                  fieldType === 'date' ? 'DD-MMM-YY' : fieldName
                }`}
              />
            ) : (
              <div>
                <Form.Control
                  size='sm'
                  type='text'
                  name={`${field}_from`}
                  value={frmData[`${field}_from`] || ''}
                  className='px-2'
                  required={true}
                  onChange={handleChange}
                  placeholder={`${'DD-MMM-YY'}`}
                />
                <br />
                <Form.Control
                  size='sm'
                  type='text'
                  name={`${field}_to`}
                  value={frmData[`${field}_to`] || ''}
                  className='px-2'
                  required={true}
                  onChange={handleChange}
                  placeholder={`${'DD-MMM-YY'}`}
                />
              </div>
            )}
          </>
        ) : fieldType === 'bool' ? (
          <Switch
            name={field}
            id={field}
            labelTxt={
              Object.keys(frmData).indexOf(field) === -1
                ? `is ${capitalCase(field.replace('is', ''))}`
                : isBoolRegex.test(field)
                ? field.match(isBoolRegex)[2]
                : 'True'
            }
            checked={frmData[field] || false}
            value={frmData[field] || false}
            onChange={(e) =>
              handleChange(e, {
                [`${field}_condition`]: 'eq',
              })
            }
          />
        ) : (
          <>
            <Form.Control
              size='sm'
              type='text'
              name={field}
              value={frmData[field] || ''}
              className='px-2'
              onChange={(e) =>
                handleChange(e, {
                  [`${field}_condition`]: cndtnsKeys[0],
                })
              }
              placeholder={`${fieldName}`}
              onClick={(e) => {
                e.preventDefault();
                setAutoFillName(field);
                setFieldValList(list[field] || []);
              }}
            />
            {fieldValList.length > 0 && autoFillName === field && (
              <>
                <ListGroup
                  className='mt-2 mb-5 position-absolute shadow-lg w-100'
                  style={{
                    zIndex: 11,
                    left: 0,
                    top: '50px',
                    maxHeight: '330px',
                    overflow: 'hidden',
                    overflowY: 'auto',
                  }}
                >
                  {fieldValList.map((fValue, idx) => (
                    <ListGroup.Item
                      action
                      onClick={(e) => {
                        e.preventDefault();
                        setFrmData((prevState) => {
                          return { ...prevState, [field]: fValue };
                        });
                        closeAutoFill();
                      }}
                      className='font-weight-bold'
                      key={idx}
                    >
                      {capitalCase(fValue)}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Button
                  variant='light'
                  size='sm'
                  type='button'
                  className='esc-or-click-btn'
                  onClick={(e) => {
                    e.preventDefault();
                    closeAutoFill();
                  }}
                >
                  Esc/click to close
                </Button>
              </>
            )}
          </>
        )}
      </>
    );
  }
);
