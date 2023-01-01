import React from "react";
import { IoMdContact } from "react-icons/io";
import { ImMobile } from "react-icons/im";
import { GoLocation } from "react-icons/go";
import CustomBookedButton from "../Store/CustomBookedButton";
import { useContext, useState } from "react";
import AuthContext from "../Store/auth-context";
import "./DetailsForm.css";
import Alert from "../UI/Alert";
import Confirm from "../UI/Confirm";
import ModalContext from "../../Modals/ModalContext";
import ReactModal from "../../Modals/ReactModal";



const convertTime = (time) => {
  let timeSplit = time.split(":");
  let hours = timeSplit[0];
  let minutes = timeSplit[1];
  let meridian = "";
  if (hours > 12) {
    meridian = "PM";
    hours -= 12;
  } else if (hours < 12) {
    meridian = "AM";
    if (hours === 0) {
      hours = 12;
    }
  } else {
    meridian = "PM";
  }
  return hours + ":" + minutes + " " + meridian;
};

const verifyName = (userName) => {
  if (userName.trim().length === 0) {
    return "please enter user name";
  }
  if (!userName.match("[a-zA-Z]")) {
    return "user name should contain only characters";
  }
  return null;
};

const verifyMobile = (mobile) => {
  if (mobile.trim().length === 0) {
    return "Please fill the Mobile number";
  }
  if (mobile.trim().length !== 10 || !mobile.match("[6-9]{1}[0-9]{9}")) {
    return "Enter valid Mobile number";
  }
  return null;
};

const verifyAddress = (address) => {
  if (address.trim().length === 0) {
    return "please enter address";
  }
  return null;
};
const verifyDate = (date) => {
  const today = new Date();
  const bookedDate = new Date(date);
  if (date.trim() === "") {
    return "please select service date";
  }
  if (bookedDate < today) {
    return "Booked date should be in future";
  }
  return null;
};
const verifyTime = (time) => {
  if (time.trim() === "") {
    return "please select time of service";
  }
  if (time.trim() !== "") {
    const timeSplit = time.split(":");
    const hours = +timeSplit[0];
    if (hours < 9 || hours > 19) {
      return "Services are available between 9:00 AM to 8:00 PM";
    }
  }
  return null;
};

const DetailsForm = () => {
  const ctx = useContext(AuthContext);
  const modalCtx = useContext(ModalContext);

  const [nameState, setNameState] = useState("");
  const [mobileState, setMobileState] = useState("");
  const [addressState, setAddressState] = useState("");
  const [dateState, setDateState] = useState("");
  const [timeState, setTimeState] = useState("");
  const [customerDetails, setCustomerDetails] = useState([]);

  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState("");
  const [addressMessage, setAddressMessage] = useState("");
  const [dateMessage, setDateMessage] = useState("");
  const [timeMessage, setTimeMessage] = useState("");

  const nameChange = (e) => {
    setNameState(e.target.value);
  };
  const mobileChange = (e) => {
    setMobileState(e.target.value);
  };
  const addressChange = (e) => {
    setAddressState(e.target.value);
  };
  const dateChange = (e) => {
    setDateState(e.target.value);
  };
  const timeChange = (e) => {
    setTimeState(e.target.value);
  };

  const nameBlur = () => {
    const name = nameState;
    const nameMessage = verifyName(name);
    if (nameMessage !== null) {
      setNameError(true);
      setNameMessage(nameMessage);
      return false;
    }
    setNameError(false);
    setNameMessage("");
    return true;
  };
  const mobileBlur = () => {
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
  const addressBlur = () => {
    const address = addressState;
    const addressMessage = verifyAddress(address);
    if (addressMessage !== null) {
      setAddressError(true);
      setAddressMessage(addressMessage);
      return false;
    }
    setAddressError(false);
    setAddressMessage("");
    return true;
  };
  const dateBlur = () => {
    const date = dateState;
    const dateMessage = verifyDate(date);
    if (dateMessage !== null) {
      setDateError(true);
      setDateMessage(dateMessage);
      return false;
    }
    setDateError(false);
    setDateMessage("");
    return true;
  };
  const timeBlur = () => {
    const time = timeState;
    const timeMessage = verifyTime(time);
    if (timeMessage !== null) {
      setTimeError(true);
      setTimeMessage(timeMessage);
      return false;
    }
    setTimeError(false);
    setTimeMessage("");
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const checkName = nameBlur();
    const checkMobile = mobileBlur();
    const checkAddress = addressBlur();
    const checkDate = dateBlur();
    const checkTime = timeBlur();

    if (
      !checkName ||
      !checkMobile ||
      !checkAddress ||
      !checkDate ||
      !checkTime
    ) {
      return;
    }

    setCustomerDetails({
      Name: nameState,
      MobileNumber: mobileState,
      Address: addressState,
      Date: dateState,
      Time: convertTime(timeState),
    });

    if (ctx.serviceItems.length === 0) {
      modalCtx.setGlobalMessage("EMPTY_SERVICE_BOOKING");
      modalCtx.setShowModal();
      return
    }

    ctx.setAlertIsShown(); // sets alert prompt
  };

  return (
    <div className="container p-4 mt-5 shadow-lg border border-dark rounded-5">
      <h2 className="text-center mb-3">Book AC Service Online</h2>
      <form onSubmit={submitHandler}>
        <div className="row justify-content-center align-item-center mb-3">
          <CustomBookedButton />
          <div className="col-md-6 mt-4">
            <IoMdContact size="1.5rem" />
            <div className="col-md mt-1">
              <input
                type="text"
                id="name"
                placeholder="Name"
                className={`form-control ${nameError ? "is-invalid" : ""}`}
                onChange={nameChange}
                onBlur={nameBlur}
              />
              {nameError && <span className="text-danger">{nameMessage}</span>}
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <ImMobile size="1.5rem" />
            <div className="col-md mt-1">
              <input
                type="text"
                id="mobile"
                placeholder="Mobile number"
                className={`form-control ${mobileError ? "is-invalid" : ""}`}
                onChange={mobileChange}
                onBlur={mobileBlur}
              />
              {mobileError && (
                <span className="text-danger">{mobileMessage}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <GoLocation size="1.5rem" />
          <div className="col-md mt-1">
            <input
              type="text"
              id="address"
              placeholder="Address"
              className={`form-control ${addressError ? "is-invalid" : ""}`}
              onChange={addressChange}
              onBlur={addressBlur}
            />
            {addressError && (
              <span className="text-danger">{addressMessage}</span>
            )}
          </div>
        </div>

        <div className="row justify-content-center align-item-center mt-3">
          <div className="col-md-6">
            <label htmlFor="serviceDate" className="form-label">
              Select service Date
            </label>
            <input
              type="date"
              name="serviceDate"
              id="serviceDate"
              className={`form-control ${dateError ? "is-invalid" : ""}`}
              onChange={dateChange}
              onBlur={dateBlur}
            />
            {dateError && <span className="text-danger">{dateMessage}</span>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="serviceTime" className="form-label">
              Select service time
            </label>
            <input
              type="time"
              name="serviceTime"
              id="serviceTime"
              className={`form-control ${timeError ? "is-invalid" : ""}`}
              onChange={timeChange}
              onBlur={timeBlur}
            />
            {timeError && <span className="text-danger">{timeMessage}</span>}
          </div>
        </div>
        <div className="row  m-4 ">
          <b className="d-flex justify-content-center float-center">
            Total Amount : Rs <span className="px-2">{ctx.amount}</span>
          </b>
        </div>
        <div className="col-md-3 d-flex offset-5">
          <button
            className="btn btn-success d-flex justify-content-center float-center"
            type="submit"
          >
            Book Now
          </button>
        </div>
      </form>
      {ctx.alertIsShown && <Alert details={customerDetails} />}
      {ctx.confirmIsShown && <Confirm />}
      {modalCtx.showModal &&
        modalCtx.globalMessage === "EMPTY_SERVICE_BOOKING" && (
          <ReactModal
            title={"Failure !"}
            body={"Book atleast one Service ..."}
            enableCancel={false}
            enableOk={true}
          />
        )}
    </div>
  );
};

export default DetailsForm;
