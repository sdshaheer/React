import React, { useRef, useState } from "react";
import classes from './FormError.module.css';
import background from './Services.module.css'

const AddServiceForm = (props) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [serviceNameValid,setServiceNameValid] = useState(true);
  const [serviceCostValid,setServiceCostValid] = useState(true);

  const serviceRef = useRef();
  const costRef = useRef();

  const handleServiceName = (e) =>{         // sets name for service
    setServiceName(e.target.value)
    setServiceNameValid(true);
  }

  const handleServiceCost = (e) =>{         // sets cost for service
    setServiceCost(e.target.value)
    setServiceCostValid(true);
  }

  const handleSubmit = (event) => {         // form submit button handler
    event.preventDefault();    
    
    if(serviceName.trim()===''){
      setServiceNameValid(false);
      return
    }
    if(serviceCost.trim()===''){
      setServiceCostValid(false);
      return
    }

    props.addService(serviceName,serviceCost);
    setServiceName('');
    setServiceCost('');
    setServiceNameValid(true)
    setServiceCostValid(true)
  };

  return (
    <div className="container md mt-5">
      <div className="row justify-content-center align-items-center">
        <div className={`p-4 col-md-6 rounded-4 shadow-sm ${background['form-background']}`}>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="mb-3">
                <label className="form-label" htmlFor="service">
                  <b>Service Name</b>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  value={serviceName}
                  ref={serviceRef}
                  onChange={handleServiceName}
                />
                {!serviceNameValid && <span className={classes.error}>service name cant be empty</span>}
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="cost">
                  <b>Enter Cost for Service</b>
                </label>
                <input
                  className="form-control"
                  type="number"
                  id="cost"
                  value={serviceCost}
                  ref={costRef}
                  onChange={handleServiceCost}
                />
                {!serviceCostValid && <span className={classes.error}>please provide cost </span>}
              </div>
              <button className="btn btn-primary" type="submit">
                Add Service
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;
