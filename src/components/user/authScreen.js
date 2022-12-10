import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { login, register } from "./redux/actions";
import { Frm } from "./partial/authScreen/frm";
import Meta from "../../util/meta";
import Breadcrumbs from "../_partial/Breadcrumbs";

const AuthScreen = React.memo((props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [massage, setMassage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();

  const registerPath = "/register";
  const isRegisterCheck = location.pathname === registerPath;

  const [isRegister, setIsRegister] = useState(isRegisterCheck);

  const { loading, error, userInfo } = useSelector((state) =>
    isRegister ? state.userRegister : state.userLogin
  );

  let redirect = location.search
    ? location.search.slice(1).split("=")[0] === "redirect"
      ? location.search.split("=")[1]
      : "/"
    : "/";

  const authUrl = {
    pathname: `/${!isRegister ? "register" : "login"}`,
  };

  if (redirect) {
    authUrl["search"] = `?redirect=${redirect}`;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (password !== confirmPassword) {
        setMassage("Password do not match");
      } else {
        dispatch(register(name, email, password));
      }
    } else {
      dispatch(login(email, password));
    }
  };

  useEffect(() => {
    setIsRegister(isRegisterCheck);
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect, location, isRegisterCheck]);

  const inputVal = {
    name,
    email,
    showPassword,
    password,
    confirmPassword,
  };

  const inputSet = {
    setName,
    setEmail,
    setShowPassword,
    setPassword,
    setConfirmPassword,
  };

  return (
    <>
      <Meta title="EasyShop | Login Form" />

      <Breadcrumbs urls={[{ text: isRegister ? "register" : "login" }]} />

      <Row className="Two-col-layout mb-5 ml-0 justify-content-center">
        <Col className="form-col pr-lg-2" xl={4} lg={5} md={7} sm={10} xs={12}>
          <Frm
            {...{
              submitHandler,
              isRegister,
              error,
              massage,
              loading,
              inputVal,
              inputSet,
            }}
          />
        </Col>

        <Col
          className="pl-lg-0 mt-lg-0 mt-3"
          xl={5}
          lg={6}
          md={7}
          sm={10}
          xs={12}
        >
          <div className="reg-msg-holder">
            <div className="pt-0 vertical-center-text">
              {!isRegister ? (
                <>
                  <h2 className="pb-0">New in </h2>
                  <h2 className="pt-0">here?</h2>
                </>
              ) : (
                <>
                  <h2 className="pb-0">Have an</h2>
                  <h2 className="pt-0">account?</h2>
                </>
              )}

              <Link to={authUrl}>
                <button className="ghost button-6 rounded-pill" type="button">
                  {!isRegister ? "Register" : "Sign In"}
                </button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default AuthScreen;
