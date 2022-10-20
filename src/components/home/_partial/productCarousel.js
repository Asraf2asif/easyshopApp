import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../../product/redux/actions';
import Product from './Product';

const ProductCarousel = ({ cartItems }) => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    !loading &&
    !error && (
      <Carousel pause='hover' interval={1100} fade={false}>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <div className='carousel-img-container'>
              {product.image && (
                <div
                  className='img'
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
              )}
              {product.images[0] && (
                <div
                  className='img d-none d-xl-block'
                  style={{ backgroundImage: `url(${product.images[0]})` }}
                ></div>
              )}
            </div>
            <Carousel.Caption className='m-auto pb-0'>
              <Product {...{ product, cartItems, carousel: true }} />
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  );
};

export default ProductCarousel;
