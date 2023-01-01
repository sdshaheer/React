import React, { useState } from "react";
import classes from "./Services.module.css";
import { useContext } from "react";
import ModalContext from "../../Modals/ModalContext";
import ReactModal from "../../Modals/ReactModal";

const verifyMobile = (mobile) => {
  if (mobile.trim().length === 0) {
    return "Please fill the Mobile number";
  }
  if (mobile.trim().length !== 10 || !mobile.match("[6-9]{1}[0-9]{9}")) {
    return "Enter valid Mobile number";
  }
  return null;
};

const verifyPassword = (password) => {
  if (password.trim().length === 0) {
    return "please enter password";
  }
  if (password.trim().length < 6) {
    return "password should be atleast 6 characters";
  }
  return null;
};

const ResetPassword = () => {
  const [mobileState, setMobileState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [reEnterPasswordState, setReEnterPasswordState] = useState("");

  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [reEnterPasswordError, setReEnterPasswordError] = useState(false);

  const [mobileMessage, setMobileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [reEnterPasswordMessage, setReEnterPasswordMessage] = useState(false);

  const modalCtx = useContext(ModalContext);

  const mobileChange = (e) => {
    setMobileState(e.target.value);
  };
  const passwordChange = (e) => {
    setPasswordState(e.target.value);
  };
  const reEnterPasswordChange = (e) => {
    setReEnterPasswordState(e.target.value);
  };

  const mobileBlur = () => {
    // Blur for Mobile
    const mobile = mobileState;
    const mobileMessage = verifyMobile(mobile);
    if (mobileMessage !== null) {
      setMobileError(true);
      setMobileMessage(mobileMessage);
      return false;
    }
    setMobileError(false);
    setMobileMessage("");
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
  const reEnterPasswordBlur = () => {
    // Blur for Re-Enter Password
    const reenterpassword = reEnterPasswordState;
    if (reenterpassword.trim().length === 0) {
      setReEnterPasswordError(true);
      setReEnterPasswordMessage("re-enter the password");
      return false;
    }
    if (passwordState !== reenterpassword) {
      setReEnterPasswordError(true);
      setReEnterPasswordMessage("password didn't match");
      return false;
    }
    setReEnterPasswordError(false);
    setReEnterPasswordMessage("");
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const checkMobile = mobileBlur();
    const checkPassword = passwordBlur();
    const checkReEnterPassword = reEnterPasswordBlur();
    if (!checkMobile || !checkPassword || !checkReEnterPassword) {
      return;
    }
    if (mobileState === modalCtx.mobileNumber) {
      modalCtx.setGlobalMessage("RESET_PASSWORD_SUCCESS");
      modalCtx.setLoginPassword(passwordState); // update login password
      modalCtx.setShowModal();
      return;
    }
    modalCtx.setGlobalMessage("RESET_PASSWORD_FAILURE");
    modalCtx.setShowModal(); // enables modal to true for success or failure
  };

  const bgStyle = {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg'`,
    backgroundSize: "cover"
  };

  return (
    <div className="container-fluid " style={bgStyle}>
      <div className="row justify-content-center align-items-center">
        <div className={`p-4 col-md-5 rounded-4 ${classes["form-background"]} mt-5 `}>
          <h2 className="text-center mb-3">Update your password</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label" htmlFor="e-mail">
                Phone Number
              </label>
              <input
                className={`form-control ${mobileError ? "is-invalid" : ""}`}
                type="text"
                id="mobile"
                onChange={mobileChange}
                onBlur={mobileBlur}
              />
              {mobileError && (
                <span className="text-danger">{mobileMessage}</span>
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

            <div className="mb-3">
              <label className="form-label" htmlFor="reset-password">
                Re-Enter Password
              </label>
              <input
                className={`form-control ${
                  reEnterPasswordError ? "is-invalid" : ""
                }`}
                type="password"
                id="reset-password"
                onChange={reEnterPasswordChange}
                onBlur={reEnterPasswordBlur}
              />
              {reEnterPasswordError && (
                <span className="text-danger">{reEnterPasswordMessage}</span>
              )}
            </div>

            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-primary float-start" type="submit">
                  Update Password
                </button>
              </div>
            </div>
          </form>
        </div>
        {modalCtx.showModal &&
          modalCtx.globalMessage === "RESET_PASSWORD_FAILURE" && (
            <ReactModal
              title={"Failure !"}
              body={"Password Reset failed due to Incorrect Mobile Number"}
              enableCancel={true}
              enableOk={false}
            />
          )}
        {modalCtx.showModal &&
          modalCtx.globalMessage === "RESET_PASSWORD_SUCCESS" && (
            <ReactModal
              title={"Success !"}
              body={"Password changes Successfully"}
              enableCancel={false}
              enableOk={true}
            />
          )}
      </div>
    </div>
  );
};

export default ResetPassword;
