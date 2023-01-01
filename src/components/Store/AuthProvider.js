import React, { useReducer } from "react";
import AuthContext from "./auth-context";

const defaultServiceState = {
  services: [],
  amount: 0,
  cartIsShown: false,
  alertIsShown: false,
  confirmIsShown: false,
  data: []
};

const serviceReducer = (state, action) => {
  
  if (action.type === "SERVICE_CART_CLICKED") {
    return {
      ...state,
      cartIsShown: !state.cartIsShown,
    };
  }

  if (action.type === "ALERT") {
    return {
      ...state,
      alertIsShown: !state.alertIsShown,
    };
  }

  if (action.type === "CONFIRM") {
    return {
      ...state,
      alertIsShown: false,
      confirmIsShown: !state.confirmIsShown,
    };
  }

  if (action.type === "ADD") {
    const findService = state.services.filter(
      (service) => service.id === action.service.id
    );
      
    if (findService.length===0) {
      const updatedServices = state.services.concat(action.service);
      const updatedamount = state.amount + action.service.cost;
      return {
        ...state,
        services: updatedServices,
        amount: updatedamount,
      };
    }
  }
  if (action.type === "REMOVE") {
    const updatedServices = state.services.filter(
      (service) => service.id !== action.Id
    );
    const updatedamount = state.amount - action.cost;
    return {
      ...state,
      services: updatedServices,
      amount: updatedamount,
    };
  }
  if (action.type === "CUSTOMER_DATA") {
      const data = {...action.data,servicesBooked:state.services}
      return {
        ...state,
        customerData:data
      };
    }
  
  
  return defaultServiceState;
};

const AuthProvider = (props) => {
  const [serviceState, dispatchService] = useReducer(
    serviceReducer,
    defaultServiceState
  );

  const addService = (service) => {
    dispatchService({ service: service, type: "ADD" });
  };
  const removeService = (Id, cost) => {
    dispatchService({ Id: Id, cost: cost, type: "REMOVE" });
  };
  const setCartIsShown = () => {
    dispatchService({ type: "SERVICE_CART_CLICKED" });
  };
  const setAlertIsShown = () => { 
    dispatchService({ type: "ALERT" });
  };
  const setConfirmIsShown = () => {
    dispatchService({ type: "CONFIRM" });
  };
  const setCustomerData = (data) => {
    dispatchService({ type: "CUSTOMER_DATA", data:data });
  };

  const serviceContext = {
    serviceItems: serviceState.services,
    addService: addService,
    amount: serviceState.amount,
    removeService: removeService,

    cartIsShown: serviceState.cartIsShown,
    setCartIsShown: setCartIsShown,

    alertIsShown: serviceState.alertIsShown,
    setAlertIsShown: setAlertIsShown,

    confirmIsShown: serviceState.confirmIsShown,
    setConfirmIsShown: setConfirmIsShown,

    customerData : serviceState.customerData,
    setCustomerData:setCustomerData

  };

  //console.log(serviceState)

  return (
    <AuthContext.Provider value={serviceContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
