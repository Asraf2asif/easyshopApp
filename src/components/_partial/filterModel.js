import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FilterForm } from './filterModel/filterForm';
import { getFrmDataInit } from './filterModel/getFrmDataInit';
import { getRedirectData } from './filterModel/getRedirectData';
import { styleDelay, objFilter, flattenArr } from '../../util/helperFunct';

export const FilterModel = ({
  srchFields,
  sort,
  show,
  handleClose,
  keyword,
  keyName,
  routeAdmin = null,
  route = null,
  list = [],
}) => {
  const tags = {
    conditionTag: '<,>',
    dateRangeTag: '<|>',
    subFieldTag: '<.>',
    subFieldSeperator: '.',
    groupTag: '<~>',
  };
  const { groupTag } = tags;

  const history = useNavigate();
  const [rangeIdx, setRangeIdx] = useState([]);
  const [frmData, setFrmData] = useState(
    getFrmDataInit(keyName, keyword, srchFields, tags)
  );

  const formByRef = useRef(null);

  const cndtnChangeHandler = (e, idx) => {
    const { name, value } = e.target;
    const field = name.replace('_condition', '');
    setFrmData((prevState) =>
      objFilter(
        prevState,
        (key) =>
          new RegExp(
            `${field}_num|${field}_date|${field}_from|${field}_to`
          ).test(key) === false
      )
    );

    setRangeIdx((prevState) =>
      value === 'range'
        ? [...prevState, idx]
        : [...prevState.filter((id) => id !== idx)]
    );
  };

  const onSearch = (e) => {
    e.preventDefault();

    const { queryFields, queryVals, errMsg } = getRedirectData(frmData, tags);

    const mainRoute = routeAdmin ? `admin/${routeAdmin}` : `${route}`;
    let redirectUrl =
      queryVals.length === 0 && queryFields.length === 0
        ? `/${mainRoute}`
        : `/search/${mainRoute}/${queryVals.join(groupTag)}/${queryFields.join(
            groupTag
          )}`;
    if (sort !== '0' && sort !== null) {
      redirectUrl += '/' + sort;
    }

    const confirmTxt =
      'OK to ignore or Cancel to correct:\n' + errMsg.join(',\n');
    if (
      errMsg.length === 0 ||
      (errMsg.length !== 0 && window.confirm(confirmTxt) === true)
    ) {
      handleClose();
      history(redirectUrl + '/1');
    }
  };

  const srchCndtns = {
    eq: 'Exact',
    gt: 'Above',
    gte: 'Above/Exact',
    lt: 'Below',
    lte: 'Below/Exact',
  };

  const fieldKeys = Object.keys(srchFields);

  useEffect(() => {
    const frm = formByRef.current;
    const frmTimeOut = styleDelay(show, frm, 300, {
      opacity: [1, 0],
      display: ['block', 'none'],
    });
    const handleClickOutside = function (event) {
      if ((frm && !frm.contains(event.target)) || !show) {
        handleClose();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      if (frmTimeOut !== null) {
        window.clearTimeout(frmTimeOut);
      }
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClose, show, sort]);

  const clearField = (fieldType, idx, field, rangeIdx, setFrmData) => {
    const nrmDateOrNumName =
      fieldType === 'date'
        ? `${field}_date`
        : fieldType === 'num'
        ? `${field}_num`
        : field;

    let fieldToClear = flattenArr([
      fieldType === 'num' || fieldType === 'date'
        ? [
            `${field}_condition`,
            rangeIdx.indexOf(idx) === -1
              ? nrmDateOrNumName
              : [`${field}_from`, `${field}_to`],
          ]
        : fieldType === 'bool'
        ? [`${field}_condition`, field]
        : field,
    ]);

    setFrmData((prevState) =>
      objFilter(prevState, (key) => fieldToClear.indexOf(key) === -1)
    );
  };

  const [autoFillName, setAutoFillName] = useState('');

  return (
    <Form
      autoComplete='off'
      ref={formByRef}
      onSubmit={onSearch}
      className='filter-model bg-white border-secondary position-absolute p-4 shadow-lg'
      style={{
        width: `${fieldKeys.length <= 8 ? 460 / 2 : 460}px`,
        animation: `${
          show ? 'slideIn' : 'slideOut'
        }.3s ease 0s 1 normal forwards`,
      }}
    >
      {/* for autocomplete off */}
      <input
        autoComplete='false'
        name='hidden'
        type='text'
        style={{ display: 'none' }}
      ></input>

      {/* filter btn top */}
      <Button
        variant='outline-secondary search-btn-top'
        size='sm'
        onClick={(e) => {
          onSearch(e);
        }}
      >
        <i className='fa-solid fa-magnifying-glass pr-1' />
        Filter
      </Button>

      {/* close btn */}
      <i
        className='fa-circle-xmark fa-regular close-btn-top'
        onClick={handleClose}
      />

      <Row>
        {Object.entries(srchFields).map(function ([keyName, valObj], idx, obj) {
          return (
            <Col sm={obj.length <= 8 ? 12 : 6} key={idx}>
              {/* input */}
              <fieldset className='display-flex position-relative'>
                <legend>{valObj.name}</legend>
                <FilterForm
                  {...{
                    valObj,
                    field: keyName,
                    idx,
                    cndtnChangeHandler,
                    srchCndtns,
                    rangeIdx,
                    frmData,
                    setFrmData,
                    list,
                    autoFillName,
                    setAutoFillName,
                  }}
                />
              </fieldset>

              {/* input clear btn */}
              {(frmData[keyName] ||
                frmData[`${keyName}_condition`] ||
                frmData[`${keyName}_num`] ||
                frmData[`${keyName}_date`] ||
                frmData[`${keyName}_from`] ||
                frmData[`${keyName}_to`]) && (
                <Button
                  variant='secondary clear-btn'
                  size='sm'
                  onClick={function () {
                    const { type: fieldType } = valObj;
                    setAutoFillName('');
                    clearField(fieldType, idx, keyName, rangeIdx, setFrmData);
                  }}
                >
                  Clear
                </Button>
              )}

              <br />
            </Col>
          );
        })}
      </Row>

      <hr />

      {/* leave btn */}
      <Button
        variant='secondary'
        size='sm'
        className='float-right fa-icon-size px-2 py-1 text-secondary'
        onClick={() => {
          window.scrollTo(0, 0);
          handleClose();
        }}
      >
        <i className='fa-solid fa-right-from-bracket' />
      </Button>

      {/* reset btn */}
      <Button
        variant='secondary'
        size='sm'
        className='float-right'
        onClick={() => {
          setFrmData({});
        }}
      >
        Reset
      </Button>

      {/* filter btn bottom */}
      <Button
        variant='primary'
        size='sm'
        className='float-right'
        type='submit'
        onClick={(e) => {
          // onSearch(e);
          window.scrollTo(0, 0);
        }}
      >
        Filter
      </Button>
    </Form>
  );
};
