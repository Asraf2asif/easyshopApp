import React, { useEffect, useState } from 'react';
import { Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, updateUser, deleteUser } from '../user/redux/actions';
import Message from '../_partial/Message';
import Loader from '../_partial/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminListBtn } from './_partial/AdminListBtn';
import Paginate from '../_partial/Paginate';
import Meta from '../../util/meta';
import { Link } from 'react-router-dom';
import RowCol from '../../util/RowCol';
import { SortControl } from '../_partial/sortControl';
import { IdSearchControl } from '../_partial/idSearchControl';
import { FilterModel } from '../_partial/filterModel';
import { formateDate } from '../../util/helperFunct';
import { listField } from '../_partial/filterModel/redux/actions';
import Breadcrumbs from '../_partial/Breadcrumbs';

const UserListScreen = React.memo(() => {
  const dispatch = useDispatch();
  const history = useNavigate();
  let {
    keyword = '',
    key = '',
    pageNumber = 1,
    sort = '-createdAt',
  } = useParams();
  // const [sortField, setSortField] = useState(sort || '0');

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages } = userList;

  const userDetails = useSelector((state) => state.userDetails);
  const { user: loggedUser } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate, error: updateErr } = userUpdate;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const { list = [] } = useSelector((state) => state.fieldList);

  useEffect(() => {
    if (loggedUser && loggedUser.isAdmin) {
      dispatch(listUsers(keyword, key, sort, pageNumber));
    } else {
      history('/login');
    }
  }, [
    dispatch,
    history,
    successUpdate,
    successDelete,
    loggedUser,
    sort,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure, you want to remove this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const updateHandler = (user) => {
    dispatch(updateUser(user._id, { isAdmin: !user.isAdmin }));
  };

  const isSelf = (user) =>
    loggedUser && loggedUser !== null && loggedUser._id === user._id;

  const isSelfAppointed = (user) =>
    loggedUser && loggedUser !== null && loggedUser._id === user.adminedBy._id;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((prevState) => !prevState);

  const srchFields = {
    name: { name: 'Name', type: 'i' },
    email: { name: 'E-mail', type: 'i' },
    isAdmin: { name: 'Is Admin', type: 'bool' },
    createdAt: { name: 'Created At', type: 'date' },
    adminedAt: { name: 'Admined At', type: 'date' },
    'adminedBy.name': { name: 'Admined By Name', type: 'i' },
    'adminedBy.email': { name: 'Admined By E-mail', type: 'i' },
  };

  useEffect(() => {
    dispatch(
      listField('user', ['name', 'email', 'adminedBy.name', 'adminedBy.email'])
    );
  }, []);

  const sortFields = [
    { field: '0', title: 'Sort By' },
    { field: '_id', title: 'ID' },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'E-mail' },
    { field: 'isAdmin', title: 'Is Admin' },
    { field: 'createdAt', title: 'Created At' },
    // { field: 'adminedBy.name', title: 'Admined By Name' },
  ];

  const routeAdmin = 'userlist';

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
    className:
      'd-block m-auto px-2 rounded-pill button-6 button-6-light-shadow button-6-small',
  };

  return (
    <>
      <Meta title='EasyShop | User List' />
      <Breadcrumbs urls={[{ text: 'user list' }]} />
      {updateErr && <Message variant='danger'>{updateErr}</Message>}
      <h2 className='d-none'>User List:</h2>
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
              sort,
              sortFields,
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
        className='float-left'
        {...{
          srchFields,
          show,
          handleClose,
          sort,
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
          <Message variant='danger'>{error}</Message>
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
                  <th className='h6'>NAME</th>
                  <th className='h6'>EMAIL</th>
                  <th className='h6'>ADMINED BY</th>
                  <th className='text-center h6'>ADMIN</th>
                  <th className='text-center h6 text-white'>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users !== null &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {user.adminedBy &&
                          (isSelfAppointed(user) ? 'Me' : user.adminedBy.name)}
                        {user.adminedAt &&
                          ` Dt: ${formateDate(user.adminedAt)}`}
                      </td>
                      <td className='text-center admin-control'>
                        {user.isAdmin ? (
                          user.adminedBy && isSelf(user) ? (
                            <AdminListBtn
                              {...{
                                btnProps: {
                                  variant: 'dark',
                                  onClick: () => updateHandler(user),
                                  ...defaultBtnProps,
                                },
                                iconProps: {
                                  className:
                                    'btn-icon fa-solid fa-right-from-bracket',
                                },
                                btnText: 'Resign',
                              }}
                            />
                          ) : user.adminedBy && isSelfAppointed(user) ? (
                            <AdminListBtn
                              {...{
                                btnProps: {
                                  variant: 'danger',
                                  onClick: () => updateHandler(user),
                                  ...defaultBtnProps,
                                },
                                btnText: 'Fire',
                                iconProps: {
                                  className: 'btn-icon fa-solid fa-ban',
                                },
                              }}
                            />
                          ) : (
                            <AdminListBtn
                              {...{
                                btnProps: {
                                  variant: 'light',
                                  onClick: () => updateHandler(user),
                                  ...{
                                    ...defaultBtnProps,
                                    className: `${defaultBtnProps.className} text-dark`,
                                  },
                                },
                                btnText: 'Other Admin',
                              }}
                            />
                          )
                        ) : (
                          <AdminListBtn
                            {...{
                              btnProps: {
                                variant: 'success',
                                onClick: () => updateHandler(user),
                                ...defaultBtnProps,
                              },
                              iconProps: {
                                className: 'btn-icon fa-regular fa-square-plus',
                              },
                              btnText: 'Appoint',
                            }}
                          />
                        )}
                      </td>
                      <td className='delete-btn'>
                        <AdminListBtn
                          {...{
                            btnProps: {
                              variant: 'danger',
                              onClick: () => deleteHandler(user._id),
                              ...defaultBtnProps,
                            },
                            iconProps: {
                              className: 'fas fa-trash',
                            },
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

export default UserListScreen;
