import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { listProductDetails } from './redux/actions';
import Loader from '../_partial/Loader';
import Message from '../_partial/Message';
import { Description } from './partial/description';
import { Info } from './partial/info';
import Meta from '../../util/meta';

const ProductScreen = React.memo(() => {
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  let { id } = useParams();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        product && (
          <>
            <Meta title={product.name} />
            <Row className='Two-col-layout mt-3 ml-0 justify-content-center'>
              <Col
                className='form-col pr-lg-2 display-flex flex-direction-column'
                xl={6}
                lg={6}
                md={11}
                sm={12}
              >
                <div className='px-4 py-5 side-info bg-white w-100'>
                  <Info {...{ product }} />
                </div>
              </Col>
              <Col
                className='pl-lg-0 mt-lg-0 mt-3'
                xl={6}
                lg={6}
                md={11}
                sm={12}
              >
                <div className='side-info bg-white'>
                  <Description {...{ product }} />
                </div>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
});

export default ProductScreen;
