import React from "react";
import { useContext } from "react";
import AuthContext from "./auth-context";

const CustomButton = (props) => {

  const ctx = useContext(AuthContext);

  const handleChange = () => {
    if(props.value==='Add'){
      ctx.addService(props.service)
    }
    if(props.value==='Remove'){
      ctx.removeService(props.service.id,props.service.cost)
    }
    
  };

  return (
    <div>
      <button
        type="button"
        className={props.className}
        onClick={handleChange}
      >
        {props.value}
      </button>
    </div>
  );
};

export default CustomButton;
