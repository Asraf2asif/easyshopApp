import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../../_partial/Rating';
import { capitalCase, compactNumber } from '../../../util/helperFunct';
import AddCart from './AddCart';

const Product = ({ product, cartItems, carousel = false }) => {
  const { _id, image, name, rating, numReviews, price, discountPercentage } =
    product;
  const previousPrice = (price / 100) * (100 + discountPercentage);

  return (
    <Card className={'rounded products-card shadow-small'}>
      {!carousel && (
        <Link to={`/product/${_id}`}>
          <div className={'products-img'}>
            <Image src={image} fluid />
          </div>
        </Link>
      )}

      <Card.Body className='flex-center pt-4'>
        <Link to={`/product/${_id}`} className='flex-center flex-wrap'>
          <Card.Title as='div' className='my-2 px-3'>
            <strong>{capitalCase(name)}</strong>
          </Card.Title>

          <Card.Text className='my-2 px-2'>
            <Rating as={Rating} value={rating} text={`${compactNumber(numReviews)}`} />
          </Card.Text>

          <Card.Text className='products-price my-2 px-2 price-tag'>
            <span className=''>${price}{' '}</span>  
            <span className=''>
            <span className='secondary-info-small discard'>
              ${Math.floor(previousPrice)}
            </span>{' '}
            <span className='secondary-info-small'>
              {Math.floor(discountPercentage)}% off
            </span>{' '}
              </span>          
          </Card.Text>
        </Link>

        <AddCart {...{ product, cartItems, carousel }} />
      </Card.Body>
    </Card>
  );
};

export default Product;
