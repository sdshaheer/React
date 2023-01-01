import React from "react";
import { useContext } from "react";
import AuthContext from "../Store/auth-context";
import Modal from "../UI/Modal";
import CustomButton from "../Store/CustomButton";
import classes from "./ServiceCart.module.css";

const ServiceCart = () => {
  const ctx = useContext(AuthContext);

  const handleChange = () => {
    ctx.setCartIsShown();
  };

  return (
    <Modal value="CART">
      <div className="container-md">
        <h3 className="text-center text-primary mb-5">Your Services Cart</h3>
        <ul className={classes["cart-services"]}>
          {ctx.serviceItems.map((item) => (
            <li className={classes.service} key={item.id}>
              <div className="row m-3">
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-9 align-items-start">
                    <b>{item.name}</b>
                    </div>
                    <div className={`${classes.price} col-md-3 align-items-center`}>
                       {item.cost}
                    </div>
                  </div>
                </div>
                <div className="d-flex col-md-4 align-items-end justify-content-end">
                  <CustomButton
                    className="btn btn-secondary rounded-4"
                    value={"Remove"}
                    service={item}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
        {ctx.serviceItems.length===0 && <span><h4>No Services Booked ! ...</h4></span>}
        <div className={`${classes.actions} mt-5`}>
          <button
            type="button"
            className={classes["button"]}
            onClick={handleChange}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceCart;
