import React, { useEffect, useState } from 'react';
import { Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders, deliverOrder } from '../order/redux/actions';
import Message from '../_partial/Message';
import Loader from '../_partial/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminListBtn } from './_partial/AdminListBtn';
import Paginate from '../_partial/Paginate';
import Meta from '../../util/meta';
import { formateDate } from '../../util/helperFunct';
import RowCol from '../../util/RowCol';
import { SortControl } from '../_partial/sortControl';
import { FilterModel } from '../_partial/filterModel';
import { IdSearchControl } from '../_partial/idSearchControl';
import { listField } from '../_partial/filterModel/redux/actions';
import Breadcrumbs from '../_partial/Breadcrumbs';

const OrderListScreen = React.memo(() => {
  const dispatch = useDispatch();
  const history = useNavigate();
  let {
    keyword = '',
    key = '',
    pageNumber = 1,
    sort = '-createdAt',
  } = useParams();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  const userDetails = useSelector((state) => state.userDetails);
  const { user: loggedUser } = userDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, error: deliverErr } = orderDeliver;

  const { list = [] } = useSelector((state) => state.fieldList);

  useEffect(() => {
    if (loggedUser && loggedUser.isAdmin) {
      dispatch(listOrders(keyword, key, sort, pageNumber));
    } else {
      history('/login');
    }
  }, [
    dispatch,
    history,
    successDeliver,
    loggedUser,
    keyword,
    key,
    sort,
    pageNumber,
  ]);

  const deliverHandler = (order) => {
    dispatch(deliverOrder(order));
  };

  const goToDetailsHandler = (id) => {
    history(`/order/${id}`);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((prevState) => !prevState);

  const srchFields = {
    'user.name': { name: 'User Name', type: 'i' },
    'user.email': { name: 'User Email', type: 'i' },
    totalPrice: { name: 'Total Price', type: 'num' },
    createdAt: { name: 'Created At', type: 'date' },
    isPaid: { name: 'Is Paid', type: 'bool' },
    deliveredAt: { name: 'Delivered At', type: 'date' },
    isDelivered: { name: 'Is Delivered', type: 'bool' },
    paymentMethod: { name: 'Payment Method', type: 'i' },
    'shippingAddress.address': { name: 'Shipping Address', type: 'i' },
    'shippingAddress.city': { name: 'Shipping City', type: 'i' },
    'shippingAddress.postalCode': {
      name: 'Shipping Postal Code',
      type: 'i',
    },
    'shippingAddress.country': { name: 'Shipping Country', type: 'i' },
  };

  useEffect(() => {
    dispatch(
      listField('order', [
        'user.name',
        'user.email',
        'shippingAddress<.>address',
        'shippingAddress<.>city',
        'shippingAddress<.>postalCode',
        'shippingAddress<.>country',
      ])
    );
  }, []);

  const sortFields = [
    { field: '0', title: 'Sort By' },
    { field: '_id', title: 'ID' },
    { field: 'user.name', title: 'User Name' },
    { field: 'totalPrice', title: 'Total Price' },
    { field: 'createdAt', title: 'Created At' },
    { field: 'isPaid', title: 'Is Paid' },
    { field: 'deliveredAt', title: 'Delivered At' },
    { field: 'isDelivered', title: 'Is Delivered' },
  ];

  const routeAdmin = 'orderlist';

  let paginateProps = {
    isAdmin: loggedUser && loggedUser !== null && loggedUser.isAdmin,
    routeAdmin,
    keyword,
    keyName: key,
    pages,
    page,
    sortBy: sort !== '0' && sort,
  };

  let defaultBtnProps = {
    size: 'sm',
    className: 'btn-sm d-block m-auto',
  };

  return (
    <>
      <Meta title='EasyShop | User List' />
      <Breadcrumbs urls={[{ text: 'order list' }]} />

      {deliverErr && <Message variant='danger'>{deliverErr}</Message>}
      <h2 className='d-none'>Order List:</h2>

      <RowCol
        colsProps={[
          { xs: 2, sm: 2, md: 1, lg: 1 },
          { xs: 9, sm: 5, md: 5, lg: 3 },
        ]}
      >
        {!show && (
          <span className='filter-btn float-left' onClick={toggleShow}>
            <i className='fa-filter fa-solid' />
            <p className='btn-tittle'>Filter</p>
          </span>
        )}
        <IdSearchControl
          {...{
            routeAdmin,
            field: '_id',
            condition: 'eq',
            keyword,
            keyName: key,
          }}
        />
        <Col xs={7} sm={7} md={5} lg={3} className='float-right p-0'>
          <SortControl
            {...{
              sortFields,
              sort,
              sort,
              pageNumber,
              keyword,
              keyName: key,
              routeAdmin,
            }}
          />
        </Col>
      </RowCol>

      <hr />
      <FilterModel
        {...{
          srchFields,
          sort,
          show,
          handleClose,
          keyword,
          keyName: key,
          routeAdmin,
          list,
        }}
      />

      {loading ? (
        <Loader />
      ) : error ? (
        <>
          <Message variant='danger' fadeTimeout={false}>
            {error}
          </Message>
        </>
      ) : (
        <>
          <div className='shadow pb-1'>
            <Table
              striped
              bordered
              hover
              responsive
              size='sm'
              className='bg-white font-weight-bold shadow mb-0'
            >
              <thead className='bg-black-i'>
                <tr>
                  <th className='h6'>ID</th>
                  <th className='text-left h6'>USER NAME</th>
                  <th className='text-right h6'>PRICE</th>
                  <th className='text-center h6'>CREATED</th>
                  <th className='text-center h6'>DELIVER</th>
                  <th className='text-center h6 text-white'>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders !== null &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user && order.user.name}</td>
                      <td className='text-right'>{order.totalPrice}</td>
                      <td className='text-center'>
                        {formateDate(order.createdAt)}
                      </td>
                      <td className='text-center'>
                        {!order.isPaid ? (
                          <span style={{ color: 'red' }}>Not Paid Yet</span>
                        ) : !order.isDelivered ? (
                          <AdminListBtn
                            {...{
                              btnProps: {
                                variant: 'success',
                                onClick: () => deliverHandler(order),
                                ...defaultBtnProps,
                              },
                              iconProps: {
                                className: 'btn-icon fa-solid fa-check',
                              },
                              btnText: 'Mark As Delivered',
                            }}
                          />
                        ) : (
                          <span>{formateDate(order.updatedAt)}</span>
                        )}
                      </td>
                      <td>
                        <AdminListBtn
                          {...{
                            btnProps: {
                              variant: 'light',
                              onClick: () => goToDetailsHandler(order._id),
                              ...defaultBtnProps,
                            },
                            iconProps: {
                              className:
                                'btn-icon fa-solid fa-arrow-up-right-from-square',
                            },
                            btnText: 'Details',
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>

          {paginateProps && <Paginate {...paginateProps} />}
        </>
      )}
    </>
  );
});

export default OrderListScreen;
