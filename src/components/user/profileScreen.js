import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { updateUserProfile } from './redux/actions';
import { Frm } from './partial/profileScreen/frm';
import Meta from '../../util/meta';
import { listMyOrders } from '../order/redux/actions';
import { UserOrder } from './partial/profileScreen/UserOrder';
import Breadcrumbs from '../_partial/Breadcrumbs';

const ProfileScreen = React.memo((props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [massage, setMassage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();

  const { loading: userDetailsGetting, user } = useSelector(
    (state) => state.userDetails
  );

  const { loading: userLoginGetting } = useSelector((state) => state.userLogin);

  const {
    loading: profileUpdating,
    error: profileUpdateErr,
    success,
  } = useSelector((state) => state.userUpdateProfile);

  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = useSelector((state) => state.orderListMy);

  const setEditable = (value) => {
    setEditName(value);
    setEditEmail(value);
    setEditPassword(value);
  };

  const resetState = useCallback(() => {
    setName(user && user.name ? user.name : '');
    setEmail(user && user.email ? user.email : '');
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const nameEditable = name && name !== user.name && editName;
    const emailEditable = email && email !== user.email && editEmail;
    const passwordEditable =
      password && password !== user.password && editPassword;
    const editable = nameEditable || emailEditable || passwordEditable;

    if (editPassword && password !== confirmPassword) {
      setMassage('Password do not match');
    }

    if (!editPassword || (editPassword && password === confirmPassword)) {
      if (editable) {
        dispatch(
          updateUserProfile({
            ...(user._id && { _id: user._id }),
            ...(nameEditable && { name }),
            ...(emailEditable && { email }),
            ...(passwordEditable && { password }),
          })
        );
        setEditable(false);
      } else {
        setMassage('Nothing to edit');
      }
    }
  };

  useEffect(() => {
    if (!user) {
      history('/login');
    } else {
      dispatch(listMyOrders());

      resetState();
    }
  }, [history, user, resetState, dispatch]);

  // const classes = authStl(props);

  const inpt = {
    val: {
      name,
      email,
      showPassword,
      password,
      confirmPassword,
    },
    set: {
      setName,
      setEmail,
      setShowPassword,
      setPassword,
      setConfirmPassword,
      setEditable,
    },
  };

  const inptEdit = {
    state: {
      editName,
      editEmail,
      editPassword,
    },
    set: {
      setEditName,
      setEditEmail,
      setEditPassword,
    },
  };

  const loading = {
    userLoginGetting,
    profileUpdating,
    userDetailsGetting,
  };

  return (
    <>
      <Meta title='EasyShop | User Profile' />
      <Breadcrumbs urls={[{ text: 'profile' }]} />

      <Row className='Two-col-layout mb-5 ml-0 justify-content-center'>
        <Col className='form-col pr-lg-2' xl={4} lg={5} md={7} sm={10} xs={12}>
          <Frm
            {...{
              submitHandler,
              massage,
              success,
              profileUpdateErr,
              loading,
              user,
              inpt,
              inptEdit,
              resetState,
            }}
          />
        </Col>

        <Col
          className='pl-lg-0 mt-lg-0 mt-3'
          xl={8}
          lg={7}
          md={7}
          sm={10}
          xs={12}
        >
          <div className='side-info px-4 bg-white'>
            <UserOrder {...{ loadingOrders, errorOrders, orders }} />
          </div>
        </Col>
      </Row>
    </>
  );
});

export default ProfileScreen;
