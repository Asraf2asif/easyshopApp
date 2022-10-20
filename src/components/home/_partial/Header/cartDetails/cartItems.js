import React from 'react';
import { Image, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../../../cart/redux/actions';
import RowCol from '../../../../../util/RowCol';
import AddCart from '../../AddCart';
import { capitalCase, adaptiveFloat, compactNumber } from '../../../../../util/helperFunct';
import Rating from '../../../../_partial/Rating';

export const CartItems = ({ cartItems, notModel = null, order = false }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const cartItemList = Object.values(cartItems);

  return (
    <>
      {notModel === true ? (
        <div>
          <p
            className='pt-4 text-center text-dark'
            style={{
              fontSize: '2em',
              fontWeight: 'bold',
            }}
          >
            <i className="fa-solid fa-cart-arrow-down fa-icon-size-xs"/> Cart Details
          </p>
          <hr />
        </div>
      ) : null}
      <div className='pl-2 pr-3'>
        {cartItemList.map(function ({
          product: id = 0,
          name = '',
          image = '',
          price = 0,
          countInStock = 0,
          rating = 0,
          numReviews = 0,
          discountPercentage = 0,
          qty = 0,
        }) {
          const previousPrice = (price / 100) * (100 + discountPercentage);
          return (
            <div key={id}>
              <RowCol
                colsProps={[
                  { md: 3, sm: 3, xs: 3 },
                  { md: 9, sm: 9, xs: 9, className: 'pl-0' },
                ]}
              >
                <Link to={`/product/${id}`}>
                  <Image src={image} alt={name} fluid rounded />
                </Link>
                <div className='pl-2'>
                  <Link to={`/product/${id}`}>
                    <p className='mb-2 text-dark fa-icon-size-md font-weight-bold'>
                      {capitalCase(name)}
                    </p>
                  </Link>
                  <div className='display-flex flex-wrap align-items-center text-right text-black-50'>
                    <div className='price-tag display-flex text-no-wrap'>
                      <span className='text-dark fa-icon-size-md font-weight-bold'>
                        {order === true ? (
                          <p>
                            {qty} X ${adaptiveFloat(price, 2)} = $
                            {adaptiveFloat(price * qty, 2)}
                          </p>
                        ) : (
                          `$${adaptiveFloat(price, 2)}`
                        )}
                      </span>

                      {order === false && (
                        <>
                          <i className="center-y-absolute fa-circle fa-solid px-2 text-muted fa-icon-size-xss"/>
                          <span
                            className='discard'
                          >
                            {discountPercentage
                              ? `$${Math.floor(previousPrice)}`
                              : null}
                          </span>
                          <span className='d-none d-sm-inline-block pl-1'>
                            {discountPercentage ? (
                              <>({Math.floor(discountPercentage)}% off)</>
                            ) : null}
                          </span>
                        </>
                      )}
                    </div>
                    <div className='display-flex align-items-center mt-2 ml-auto'>
                      {rating && rating > 0 && order === false ? (
                        <>
                          <i className='fa-solid fa-star fa-icon-size-sm' />
                          <span className='pl-1'>{rating}</span>
                        </>
                      ) : null}

                      {order === true && (
                        <>
                          {/* <span
                            className='pl-2'
                            style={{
                              textDecoration: 'line-through',
                            }}
                          >
                            {discountPercentage
                              ? Math.floor(previousPrice)
                              : null}
                          </span> */}
                          <span className='d-none d-sm-inline-block pl-1'>
                            {discountPercentage ? (
                              <>(Saved {Math.floor(discountPercentage)}%)</>
                            ) : null}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <Row
                    className={`${
                      order === false ? 'mt-1' : 'mt-2'
                    } align-items-center`}
                  >
                    <Col>
                      <div className={order === false && 'float-right'}>
                        {order === true ? (
                          <span className='pt-2 display-flex'>
                            <Rating
                              as={Rating}
                              value={rating}
                              text={`${compactNumber(numReviews)} Reviews`}
                            />
                          </span>
                        ) : (
                          <AddCart
                            {...{
                              product: {
                                _id: id,
                                name,
                                image,
                                price,
                                countInStock,
                                qty,
                              },
                              cartItems,
                              removeIcon: false,
                              standAlone: true,
                            }}
                          />
                        )}
                      </div>
                    </Col>
                    {order === false && (
                      <Col>
                        <Button
                          type='button'
                          variant='link'
                          size='sm'
                          onClick={() => removeFromCartHandler(id)}
                          className='fa-icon-size-md bg-transparent button-6 button-6-light-shadow float-right m-0 px-2 py-1 text-black-50 text-capitalize text-decoration-none'
                        >
                          <i className='fas fa-trash' /> Delete
                        </Button>
                      </Col>
                    )}
                  </Row>
                </div>
              </RowCol>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};
