import React from "react";
import { SERVICES } from "../Admin/Services";
import CustomButton from "../Store/CustomButton";
import classes from "./DisplayUserServices.module.css";

const DisplayUserServices = () => {
  const services = SERVICES;

  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-md-6">
          <img
            className="img-fluid w-100 h-100 col-ms w-25 h-25"
            src="https://www.searchhyderabad.com/wp-content/uploads/2022/04/AC-Repairing-in-Hyderabad.png"
            alt="Ac services"
          />
        </div>
        <div className="col-md-6">
          <img
            className="img-fluid w-100 h-100 rounded"
            src="https://5.imimg.com/data5/WI/LR/QR/ANDROID-56346929/product-jpeg-500x500.jpg"
            alt="Ac services"
          />
        </div>
      </div>
      <div className="row shadow-lg border border-dark rounded-3 ">
        <ul>
          {services.map((service) => (
            <li className={classes.service} key={service.id}>
              <div>
                <h5>{service.name}</h5>
                <div className={classes.price}>Rs {service.cost}</div>
              </div>
              <div>
                <CustomButton
                  className="btn btn-primary rounded-4"
                  value={"Add"}
                  service={service}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayUserServices;
