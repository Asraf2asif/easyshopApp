import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import Meta from '../../util/meta';
import { useParams } from 'react-router-dom';
import { FilterModel } from '../_partial/filterModel';
import { SortControl } from '../_partial/sortControl';
import { IdSearchControl } from '../_partial/idSearchControl';
import RowCol from '../../util/RowCol';
import { listField } from '../_partial/filterModel/redux/actions';
import ProductCarousel from './_partial/productCarousel';
import ProductList from './_partial/ProductList';
import Breadcrumbs from '../_partial/Breadcrumbs';

const getCatBreadCrumbs = (key, keyword) => {
  const categoryName = 'category<.>parent<.>name';
  const subCategoryName = 'category<.>name';
  const keywordArr = keyword.split('<~>');
  const keyArr = key.split('<~>');
  let catBreadCrumbs = [];
  for (let i = 0; i < keyArr.length; i++) {
    if (keyArr[i] === categoryName) {
      catBreadCrumbs.push({
        link: `/search/page/${keywordArr[i]}/${categoryName}/`,
        text: keywordArr[i],
        id: 1,
      });
    } else if (keyArr[i] === subCategoryName) {
      catBreadCrumbs.push({
        text: keywordArr[i],
        id: 2,
      });
    }

    if (catBreadCrumbs.length === 2) {
      break;
    }
  }
  return catBreadCrumbs.sort((a, b) => a.id - b.id);
};

const HomeScreen = React.memo(() => {
  const dispatch = useDispatch();

  const { cartItems = {} } = useSelector((state) => state.cart);

  let { keyword = '', key = '', pageNumber = 1, sort = 'name' } = useParams();

  const { list = [] } = useSelector((state) => state.fieldList);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((prevState) => !prevState);

  const srchFields = {
    name: { name: 'Name', type: 'i' },
    price: { name: 'Price', type: 'num' },
    rating: { name: 'Rating', type: 'num' },
    'category.name': { name: 'Sub Category', type: 'i' },
    'category.parent.name': { name: 'Category', type: 'i' },
    brand: { name: 'Brand', type: 'i' },
  };

  useEffect(() => {
    dispatch(
      listField('product', [
        'name',
        'category.name',
        'category.parent.name',
        'brand',
      ])
    );
  }, []);

  const sortFields = [
    { field: '0', title: 'Sort By' },
    { field: 'name', title: 'Name' },
    { field: 'price', title: 'Price' },
    { field: 'rating', title: 'Rating' },
    { field: 'brand', title: 'Brand' },
  ];

  const route = 'page';  

  return (
    <>
      <Meta />
      {
        <>
          {keyword === '' ? (
            <ProductCarousel className='mt-3' {...{ cartItems }} />
          ) : (
            <Breadcrumbs urls={getCatBreadCrumbs(key, keyword)} />
          )}

          <RowCol
            colsProps={[
              { xs: 2, sm: 2, md: 1, lg: 1 },
              { xs: 9, sm: 5, md: 5, lg: 3 },
            ]}
            className={`mb-2 ${keyword === '' ? 'mt-5' : 'mt-0'}`}
          >
            {!show && (
              <span className='filter-btn  float-left' onClick={toggleShow}>
                <i className='fa-filter fa-solid' />
                <p className='btn-tittle'>Filter</p>
              </span>
            )}

            <IdSearchControl
              {...{
                route,
                field: 'name',
                keyword,
                keyName: key,
              }}
            />
            <Col
              xs={7}
              sm={7}
              md={5}
              lg={3}
              className='float-right p-0 mr-5 mr-sm-0'
            >
              <SortControl
                {...{
                  sort,
                  sortFields,
                  pageNumber,
                  keyword,
                  keyName: key,
                  route,
                }}
              />
            </Col>
          </RowCol>

          <FilterModel
            {...{
              srchFields,
              show,
              handleClose,
              sort,
              keyword,
              keyName: key,
              route,
              list,
            }}
          />
          <hr />
            <ProductList />
        </>
      }
    </>
  );
});

export default HomeScreen;
