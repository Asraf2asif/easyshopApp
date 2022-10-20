import React, { Suspense, useEffect } from 'react';

import { pathsGen, routesGen } from './util/routesGen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Loader from './components/_partial/Loader';

import Header from './components/home/_partial/Header';
import Footer from './components/home/_partial/Footer';

const Home = React.lazy(() => import('./components/home/screen'));
const Product = React.lazy(() => import('./components/product/screen'));
const Shipping = React.lazy(() => import('./components/cart/shippingScreen'));
const Order = React.lazy(() => import('./components/order/screen'));
const Auth = React.lazy(() => import('./components/user/authScreen'));
const Profile = React.lazy(() => import('./components/user/profileScreen'));
const UserList = React.lazy(() => import('./components/admin/userListScreen'));
const OrderList = React.lazy(() =>
  import('./components/admin/orderListScreen')
);

const HomeScreen = () => (
  <Suspense fallback={<Loader />}>
    <Home />
  </Suspense>
);

const ProductScreen = () => (
  <Suspense fallback={<Loader />}>
    <Product />
  </Suspense>
);

const ShippingScreen = () => (
  <Suspense fallback={<Loader />}>
    <Shipping />
  </Suspense>
);

const OrderScreen = () => (
  <Suspense fallback={<Loader />}>
    <Order />
  </Suspense>
);

const AuthScreen = () => (
  <Suspense fallback={<Loader />}>
    <Auth />
  </Suspense>
);

const ProfileScreen = () => (
  <Suspense fallback={<Loader />}>
    <Profile />
  </Suspense>
);

const UserListScreen = () => (
  <Suspense fallback={<Loader />}>
    <UserList />
  </Suspense>
);

const OrderListScreen = () => (
  <Suspense fallback={<Loader />}>
    <OrderList />
  </Suspense>
);

export default function App({ hideLoader }) {
  useEffect(hideLoader, []);
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-3 pb-5 pt-4'>
          <Routes>
            {/* Auth Routes */}
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/login' element={<AuthScreen />} />
            <Route path='/register' element={<AuthScreen />} />
            {/* order Routes */}
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<ShippingScreen />} />
            <Route path='/placeorder' element={<ShippingScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            {/* admin Routes */}
            {routesGen({
              element: <UserListScreen />,
              paths: pathsGen('userlist', true),
            })}
            {routesGen({
              element: <OrderListScreen />,
              paths: pathsGen('orderlist', true),
            })}
            {/* product Routes */}
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/' element={<HomeScreen />} exact />
            {routesGen({
              element: <HomeScreen />,
              paths: pathsGen('page'),
            })}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

// git remote add origin https://github.com/Asraf2asif/MearnEcommerce.git
// git push --set-upstream origin main
