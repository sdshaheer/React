import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Login.module.css";
import { useContext } from "react";
import ModalContext from "../Modals/ModalContext";
import ReactModal from "../Modals/ReactModal";

const verifyLoginId = (loginId) => {
  if (loginId.trim().length === 0) {
    return "please enter Login Id";
  }
  return null;
};

const verifyPassword = (password) => {
  if (password.trim().length === 0) {
    return "password can't be empty";
  }
  return null;
};

const Login = (props) => {
  const history = useHistory();
  const modalCtx = useContext(ModalContext);

  const [loginIdState, setLoginIdState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const [loginIdError, setLoginIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginIdMessage, setLoginIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const loginIdChange = (e) => {
    setLoginIdState(e.target.value);
  };
  const passwordChange = (e) => {
    setPasswordState(e.target.value);
  };

  const loginIdBlur = () => {
    const loginId = loginIdState;
    const loginIdMessage = verifyLoginId(loginId);
    if (loginIdMessage !== null) {
      setLoginIdError(true);
      setLoginIdMessage(loginIdMessage);
      return false;
    }
    setLoginIdError(false);
    setLoginIdMessage("");
    return true;
  };
  const passwordBlur = () => {
    // Blur for Password
    const password = passwordState;
    const passwordMessage = verifyPassword(password);
    if (passwordMessage !== null) {
      setPasswordError(true);
      setPasswordMessage(passwordMessage);
      return false;
    }
    setPasswordError(false);
    setPasswordMessage("");
    return true;
  };

  const handleReset = () => {
    history.push("/ResetPassword");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const checkLoginId = loginIdBlur();
    const checkPassword = passwordBlur();

    if (!checkLoginId || !checkPassword) {
      return;
    }

    if (
      loginIdState !== modalCtx.loginId ||
      passwordState !== modalCtx.loginPassword
    ) {
      modalCtx.setGlobalMessage('LOGIN_FAILURE')
      modalCtx.setShowModal();
      return
    }

    props.handler();
    localStorage.setItem("loggedIn", true);
    history.push("/AdminPage");
  };

  const bgStyle = {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url("https://mdbootstrap.com/img/new/fluid/city/018.jpg")`,
    backgroundSize: "cover"
  };

  return (
    <div className="container-fluid" style={bgStyle}>
      <div className="row justify-content-center align-items-center">
        <div className={`p-4 col-md-4 rounded-5 col-sm-6 mt-5 ${classes.background}`}>
          <h3 className="text-center">Login to continue</h3>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label" htmlFor="e-mail">
                Login Id
              </label>
              <input
                className={`form-control ${loginIdError ? "is-invalid" : ""}`}
                type="text"
                id="e-mail"
                onChange={loginIdChange}
                onBlur={loginIdBlur}
              />
              {loginIdError && (
                <span className="text-danger">{loginIdMessage}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                type="password"
                id="password"
                onChange={passwordChange}
                onBlur={passwordBlur}
              />
              {passwordError && (
                <span className="text-danger">{passwordMessage}</span>
              )}
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <button className="btn btn-primary float-start" type="submit">
                  Login
                </button>
              </div>
              <div className="col-md-6 ">
                <button
                  className="btn btn-dark float-end"
                  type="button"
                  onClick={handleReset}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </form>
        </div>
        {modalCtx.showModal && modalCtx.globalMessage==='LOGIN_FAILURE' && (
          <ReactModal
            title={"Failure !"}
            body={"Incorrect Credentials...Check your LoginId and password"}
            enableCancel={true}
            enableOk={false}
          />
        )}
      </div>
    </div>
  );
};
export default Login;
