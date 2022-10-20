import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Badge } from 'react-bootstrap';
import { listProduct } from '../../product/redux/actions';
import Product from './Product';
import Loader from '../../_partial/Loader';
import Message from '../../_partial/Message';
import Paginate from '../../_partial/Paginate';
import { useParams } from 'react-router-dom';
import { PreLoader } from './PreLoader';
import { setModelVisibility } from '../../cart/redux/actions';
import { cartCalculation } from '../../../util/helperFunct';

function findPos(obj, offset = 0, onset = 0) {
  var curtop = 0 - offset + onset;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return [curtop];
  }
}

const ProductList = React.memo(() => {
  const dispatch = useDispatch();

  let { keyword = '', key = '', pageNumber = 1, sort = 'name' } = useParams();

  const {
    loading,
    error,
    products = [],
    page,
    pages,
    count,
  } = useSelector((state) => state.productList);

  const { cartItems = {} } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(listProduct(keyword, key, sort, pageNumber));
    if (pageNumber > 1 && keyword === '') {
      window.scroll(0, findPos(document.getElementById('products'), 100));
    } else {
      window.scroll(0, 0);
    }
  }, [keyword, sort, pageNumber]);

  const route = 'page';

  let paginateProps = {
    route,
    keyword,
    keyName: key,
    pages,
    page,
    sortBy: sort !== '0' && sort,
  };

  const { itemsPrice: grossPrice, totalItem } = cartCalculation(cartItems, 1);

  return (
    <>
      {loading ? (
        <>
          <Loader />
          <Row>
            {[...Array(12).keys()].map((_, idx) => (
              <Col key={idx} sm={12} md={6} lg={4} xl={3}>
                <PreLoader />
              </Col>
            ))}
          </Row>
        </>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {totalItem > 0 && (
            <>
              <span
                className='button-6 p-2 pointer position-fixed rounded-pill text-dark'
                onClick={() => dispatch(setModelVisibility(true))}
                style={{
                  right: '3%',
                  top: '40%',
                  zIndex: 10,
                }}
              >
                <i
                  className='fa-solid fa-cart-shopping'
                  style={{ fontSize: '1.9em' }}
                />
                <Badge
                  pill
                  bg='danger'
                  className='text-white position-absolute'
                  style={{ top: '-14px', right: 0, fontSize: '1em' }}
                >
                  {totalItem}
                </Badge>
                <span
                  className='border-secondary d-inline-block p-1 position-absolute text-center center-x-absolute'
                  style={{ left: '60%', bottom: '-33px', fontSize: '1em' }}
                >
                  ${Math.round(grossPrice)}
                </span>
              </span>
            </>
          )}

          {count > 0 && keyword !== '' && (
            <p className='m-0 mt-3 text-secondary'>About {count} products</p>
          )}

          <Row id='products'>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product {...{ product, cartItems }} />
                </Col>
              ))}
          </Row>

          {paginateProps && <Paginate placement='bottom' {...paginateProps} />}
        </>
      )}
    </>
  );
});

export default ProductList;
