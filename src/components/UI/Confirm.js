import React from "react";
import Modal from "./Modal";
import { useContext } from "react";
import AuthContext from "../Store/auth-context";
import { GiConfirmed } from "react-icons/gi";


const Confirm = (props) => {
  const ctx = useContext(AuthContext);

  const confirmHandler = () => {
    console.log(props.bookingId)
    ctx.setConfirmIsShown();
  };
  
  return (
    <Modal>
      <div className="container">
        <span className="text-center mb-3 p-3">
          <h1>Booking Details</h1>
        </span>
        <span className="d-flex align-items-center justify-content-center">
          <GiConfirmed className="d-flex justify-content-center" color="green" size="8rem" />
        </span>
        <div className="text-center m-3"><h3>Success</h3></div>
        <p>
          Hi, Your Booking For The Service with Booking ID <b>{ctx.customerData.BookingId}</b> is Confirmed. within
          1 hour you will Get Call From Our Service Expert. Thanks For Using
          Website!
        </p>
        <div className="text-center">
          <button
            className="btn btn-success rounded-2 m-3 float-middle"
            type="button"
            onClick={confirmHandler}
          >
            Okay
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
