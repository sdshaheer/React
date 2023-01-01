import React, { useReducer } from "react";
import ModalContext from "./ModalContext";

const defaultModalState = {
  mobileNumber:'9550007935',
  loginId: "SHAHEER",
  loginPassword: "SHAHEER",
  showModal: false,
  globalMessage:''
};

const ModalReducer = (state, action) => {
  if (action.type === "MODAL") {
    return {
        ...state,
      showModal: !state.showModal,
    };
  }

  if (action.type === "RESET_PASSWORD") {
    return {
        ...state,
      loginPassword:action.password
    };
  }

  if (action.type === "MESSAGE") {
    console.log('hello')
    return {
        ...state,
      globalMessage: action.message,
    };
  }

  return defaultModalState;
};

const ModalProvider = (props) => {
  const [ModalState, dispatchModal] = useReducer(
    ModalReducer,
    defaultModalState
  );

  const setShowModal = () => {
    dispatchModal({ type: "MODAL" });
  };
  const setLoginPassword = (password) => {
    dispatchModal({ type: "RESET_PASSWORD",password:password });
  };
  const setGlobalMessage = (message) => {
    dispatchModal({ type: "MESSAGE",message:message });
  };

  const ModalStateContext = {
    mobileNumber:ModalState.mobileNumber,
    loginId:ModalState.loginId,
    loginPassword:ModalState.loginPassword,
    setLoginPassword:setLoginPassword,

    showModal: ModalState.showModal,
    setShowModal: setShowModal,

    globalMessage:ModalState.globalMessage,
    setGlobalMessage:setGlobalMessage
  };

  //console.log(ModalState);

  return (
    <ModalContext.Provider value={ModalStateContext}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
