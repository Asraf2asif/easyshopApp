import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../user/redux/actions";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavMenus from "./Header/NavMenus";
import CartDetails from "./Header/cartDetails";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { user: userInfo } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const loginUrl =
    path === "/"
      ? `${process.env.REACT_APP_BASE_URL}/login`
      : `${process.env.REACT_APP_BASE_URL}/login/?redirect=${path}`;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>EasyShop</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
            <div className="float-left">
              <NavMenus />
            </div>
          </Nav>
          <div className="ml-sm-auto display-flex">
            {/* <LinkContainer to='/cart' className='pointer'> */}
            <Navbar.Text className="position-relative">
              {/* <i
                  className='fa-solid fa-cart-shopping fa-icon-size'
                /> */}
              <CartDetails />
            </Navbar.Text>
            {/* </LinkContainer> */}
            {userInfo ? (
              <NavDropdown
                title={userInfo && userInfo.name}
                id="username"
                className="text-white-50"
              >
                {userInfo && userInfo.isAdmin && (
                  <>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </>
                )}
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to={loginUrl} className="pointer">
                <Navbar.Text className="ml-3">
                  <i className="fa-regular fa-user" />
                  &nbsp; Login
                </Navbar.Text>
              </LinkContainer>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
