import React from "react";
import Modal from "./Modal";
import { useContext } from "react";
import AuthContext from "../Store/auth-context";
import Confirm from "./Confirm";


const bookingCode = () => {
  var text = "";
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
  for (var i=0;i<6;i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  
  return text;
}


const Alert = (props) => {
  const ctx = useContext(AuthContext);
  const bookingId = bookingCode()


  const cancelHandler = () => {
    ctx.setAlertIsShown();
  };
  const confirmHandler = () => {
    const data = {...props.details, BookingId:bookingId}
    console.log(data)
    ctx.setCustomerData(data)
    ctx.setConfirmIsShown()
  };

  return (
    <Modal value="ALERT">
      <div className="container">
        <span className="m-3 text-center">
          <h1>Confirm Booking !</h1>
        </span>
        <div className="row">
          <div>
            <button
              className="btn btn-danger rounded-2 m-3 float-start"
              type="button"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button
              className="btn btn-success rounded-2 m-3 float-end"
              type="button"
              onClick={confirmHandler}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      {ctx.confirmIsShown && <Confirm/>}
    </Modal>
  );
};

export default Alert;
