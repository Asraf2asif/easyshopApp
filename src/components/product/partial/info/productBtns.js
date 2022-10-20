import React, { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import AddCart from '../../../home/_partial/AddCart';
import RowCol from '../../../../util/RowCol';
import { handleFocus } from '../../../../util/helperFunct';

const RowStylePrdctBtnS = { className: 'col-auto  pl-0' };

function ProductBtnS({ product }) {
  const { cartItems = {} } = useSelector((state) => state.cart);
  const [modalShow, setModalShow] = useState(false);
  const [btnId, setBtnId] = useState(0);

  const productClick = useCallback((id) => {
    setBtnId(id);
    setModalShow(true);
  }, []);

  const productBtnInfo = useMemo(
    () => [
      {
        iconClass: 'fa-regular fa-message',
        text: 'Ask Question',
        onClick: () => productClick(0),
      },
      {
        iconClass: 'fa-regular fa-star',
        text: 'Rate & Review',
        onClick: () => productClick(1),
      },
      {
        iconClass: 'fa-regular fa-bookmark',
        text: 'Save',
        onClick: () => productClick(2),
      },
      {
        iconClass: 'fa-solid fa-bug',
        text: 'Report',
        onClick: () => productClick(3),
      },
    ],
    []
  );

  return (
    <>
      <RowCol
        className='justify-content-center mt-3 pl-3'
        colsProps={[RowStylePrdctBtnS, RowStylePrdctBtnS]}
      >
        <AddCart
          {...{
            product,
            cartItems,
            carousel: false,
            productPage: true,
          }}
        />

        <ProductBtn {...productBtnInfo[0]} />
      </RowCol>

      <RowCol
        className='justify-content-center pl-3'
        colsProps={[RowStylePrdctBtnS, RowStylePrdctBtnS, RowStylePrdctBtnS]}
      >
        <ProductBtn {...productBtnInfo[1]} />
        <ProductBtn {...productBtnInfo[2]} />
        <ProductBtn {...productBtnInfo[3]} />
      </RowCol>

      <BtnModel
        show={modalShow}
        onHide={() => setModalShow(false)}
        heading={productBtnInfo[btnId].text}
        btnId={btnId}
      />
    </>
  );
}

function AskQuestionForm({ cancelHandler, ...props }) {
  return (
    <Form {...props}>
      <Form.Group>
        <Form.Label htmlFor='question'>Your Question:</Form.Label>
        <Form.Control
          as='textarea'
          name='question'
          rows={3}
          placeholder='Ask any question about this product.'
          onFocus={handleFocus}
          autoFocus
        />
      </Form.Group>
      <BtnModelCtrl submitText='Submit Question' {...{ cancelHandler }} />
    </Form>
  );
}

function ReportForm({ cancelHandler, ...props }) {
  return (
    <Form {...props}>
      <Form.Group>
        <Form.Label htmlFor='report'>Error / Bug Report:</Form.Label>
        <Form.Control
          as='textarea'
          name='report'
          rows={3}
          placeholder='Please describe the problem you are facing, we will try to help you as sincerely as possible.'
          onFocus={handleFocus}
          autoFocus
        />
      </Form.Group>
      <BtnModelCtrl {...{ cancelHandler }} />
    </Form>
  );
}

const ratingsData = [
  { id: 0.5, text: 'star-1' },
  { id: 1, text: 'star-1' },
  { id: 1.5, text: 'star-2' },
  { id: 2, text: 'star-2' },
  { id: 2.5, text: 'star-3' },
  { id: 3, text: 'star-3' },
  { id: 3.5, text: 'star-4' },
  { id: 4, text: 'star-4' },
  { id: 4.5, text: 'star-5' },
  { id: 5, text: 'star-5' },
];

const ratingsRemarks = {
  0.5: { remark: 'Very bad' },
  1: { remark: 'Bad' },
  1.5: { remark: 'Poor' },
  2: { remark: 'Not Fair' },
  2.5: { remark: 'Fair' },
  3: { remark: 'Satisfactory' },
  3.5: { remark: 'Satisfactory' },
  4: { remark: 'Good' },
  4.5: { remark: 'Very good' },
  5: { remark: 'Excelent' },
};

const reviewSettingsData = [
  {
    id: 0,
    text: 'Name',
    msg: 'Only Rating Star & Review Text will be displayed',
  },
  {
    id: 1,
    text: 'Review text',
    msg: 'Only Rating Star & Your Name will be displayed',
  },
  {
    id: 2,
    text: 'Both Name & Review text',
    msg: 'Only Rating Star will be displayed',
  },
];

function RateNReviewForm({ cancelHandler, ...props }) {
  const [rating, setRating] = useState(0);
  const [reviewSettings, setReviewSettings] = useState(-1);

  // const onReviewSettingsChange = (position) => {
  //   const updatedCheckedState = reviewSettings.map((item, index) =>
  //     index === position ? !item : item
  //   );
  //   setReviewSettings(updatedCheckedState);
  // };

  return (
    <div {...props}>
      <Form>
        <Form.Group className='mb-4'>
          <Form.Label>Rate this product</Form.Label>
          <Row>
            {ratingsData.map(({ id, text }) => (
              <Col xs='auto' key={id} className='p-0'>
                <Form.Check type='radio' id={`rate-${id}`} className='pl-3'>
                  <Form.Check.Input
                    type='radio'
                    className='pointer d-none'
                    value={id}
                    name='rate'
                    checked={rating === id}
                    onChange={(e) => {
                      setRating(e.target.value);
                    }}
                  />
                  <Form.Check.Label
                    className={`pointer hover-color hover-transform text-center ${text}`}
                  >
                    <i
                      className={`display-6 hover-transform-scale fa-solid ${
                        id % 1 !== 0 ? 'fa-star-half-stroke' : 'fa-star'
                      }`}
                    />
                    <p className='text-muted hover-color-black'>{id}</p>
                  </Form.Check.Label>
                </Form.Check>
              </Col>
            ))}
          </Row>
          {rating && rating !== 0 ? (
            <div className='text-dark star-5 mt-1'>
              Your Ratings:
              <span className='badge bg-light fa-icon-size-sm ml-2 px-1 px-2 px-3 py-2 rounded-pill'>
                <i className={`fa-solid fa-star`} /> {rating}{' '}
                <span className='text-muted'>{ratingsRemarks[rating].remark}</span>
              </span>
            </div>
          ) : null}
        </Form.Group>
      </Form>
      <Form>
        <Form.Group>
          <Form.Label htmlFor='review'>Review:</Form.Label>
          <Form.Control
            as='textarea'
            name='review'
            rows={3}
            placeholder='Please provide your valuable review about this product.'
            onFocus={handleFocus}
            autoFocus
          />
        </Form.Group>
        <BtnModelCtrl {...{ cancelHandler }} />
      </Form>
      <RowCol
        className='align-items-center mt-4 text-center'
        colsProps={[
          { className: 'pr-0' },
          { className: 'col-auto' },
          { className: 'pl-0' },
        ]}
      >
        <hr />
        Privacy Settings
        <hr />
      </RowCol>
      <Form>
        <Form.Group controlId='formReviewSettings'>
          <Form.Label>Hide your review info from reviews page</Form.Label>
          {reviewSettingsData.map(({ id, text }) => (
            <Form.Check
              key={id}
              type='radio'
              id={`reviewSettings-${id}`}
              className='py-1'
            >
              <Form.Check.Input
                type='radio'
                className='pointer'
                value={id}
                name='reviewSettings'
                checked={Number(reviewSettings) === id}
                onChange={(e) => {
                  setReviewSettings(e.target.value);
                }}
                // name={text}
                // value={text}
                // checked={reviewSettings[idx]}
                // onChange={() => onReviewSettingsChange(idx)}
              />
              <Form.Check.Label className='pointer'>{text}</Form.Check.Label>
            </Form.Check>
          ))}
        </Form.Group>
      </Form>

      {reviewSettingsData[reviewSettings] &&
        reviewSettingsData[reviewSettings] !== -1 &&
        reviewSettingsData[reviewSettings].msg && (
          <p className='ml-3 mt-1 text-muted'>
            {reviewSettingsData[reviewSettings].msg}
          </p>
        )}
    </div>
  );
}

function SaveForm({ cancelHandler, ...props }) {
  return (
    <div {...props}>
      <RowCol colsProps={[{}, {}, { xs: 'auto' }]}>
        <Form.Control size='sm' placeholder='Library Name' name='libraryName' />
        <Button
          type='button'
          size='sm'
          variant='info'
          className='btn-block button-6 m-0'
          // onClick={submitHandler && submitHandler}
        >
          Save & Close
        </Button>
        <Button
          type='button'
          size='sm'
          variant='outline-light'
          className='btn-block button-6 m-0 text-black-50 bg-transparent'
          onClick={cancelHandler && cancelHandler}
        >
          Close
        </Button>
      </RowCol>
      <RowCol
        className='align-items-center mt-4 text-center'
        colsProps={[
          { className: 'pr-0' },
          { className: 'col-auto' },
          { className: 'pl-0' },
        ]}
      >
        <hr />
        OR
        <hr />
      </RowCol>
      <Form>
        <Form.Group controlId='formLibrarySelect'>
          <Form.Label>Select from your library</Form.Label>
          {[
            { id: 1, text: 'One' },
            { id: 2, text: 'Two' },
            { id: 3, text: 'Three' },
            { id: 4, text: 'Four' },
          ].map(({ id, text }) => (
            <Form.Check key={id} type='checkbox' id={id} className='py-1'>
              <Form.Check.Input
                type='checkbox'
                className='pointer'
                name='inputLibrarySelect'
              />
              <Form.Check.Label className='pointer'>{text}</Form.Check.Label>
            </Form.Check>
          ))}
        </Form.Group>
      </Form>
    </div>
  );
}

function BtnModelCtrl({
  cancelHandler = null,
  cancelText = 'Cancel',
  submitHandler = null,
  submitText = 'Submit',
  variant = '',
}) {
  return (
    <RowCol className='my-3'>
      <Button
        type='button'
        size='sm'
        variant='outline-light'
        className='btn-block button-6 m-0 text-black-50 bg-transparent'
        onClick={cancelHandler && cancelHandler}
      >
        {cancelText}
      </Button>

      <Button
        type='button'
        size='sm'
        variant='info'
        className='btn-block button-6 m-0 float-right'
        onClick={submitHandler && submitHandler}
      >
        {submitText}
      </Button>
    </RowCol>
  );
}

function BtnModel(props) {
  const { heading = 'Product heading', btnId = 0, ...otherProps } = props;
  return (
    <Modal {...otherProps} size='lg' aria-labelledby='image-model' centered>
      <Modal.Header className='bg-black-i' closeButton>
        <Modal.Title
          id='image-model'
          as='p'
          className='display-6 font-weight-bold m-0 pl-3 text-capitalize text-dark'
        >
          {heading}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        as={
          btnId === 0
            ? AskQuestionForm
            : btnId === 1
            ? RateNReviewForm
            : btnId === 2
            ? SaveForm
            : btnId === 3
            ? ReportForm
            : 'div'
        }
        cancelHandler={otherProps.onHide}
        className='p-5 bg-white'
      ></Modal.Body>
    </Modal>
  );
}

function ProductBtn({ iconClass, text, onClick }) {
  return (
    <Button
      onClick={onClick}
      variant='light'
      size='sm'
      className='text-dark button-6 button-6-small rounded-pill'
      type='button'
    >
      <i className={`${iconClass} fa-icon-size`} /> {text}
    </Button>
  );
}

export { ProductBtnS };
