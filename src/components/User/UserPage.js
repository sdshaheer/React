import React from "react";
import AuthContext from "../Store/auth-context";
import DetailsForm from "./DetailsForm";
import DisplayUserServices from "./DisplayUserServices";
import { useContext } from "react";
import ServiceCart from "./ServiceCart";

const UserPage = () => {
  const ctx = useContext(AuthContext);
  return (
    <div>
      {ctx.cartIsShown && <ServiceCart/>}
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <DisplayUserServices />
            </div>
            <div className="col-md-6">
              <DetailsForm />
            </div>
          </div>
        </div>
    </div>
  );
};

export default UserPage;
