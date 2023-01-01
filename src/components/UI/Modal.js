import React from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import BackDrop from "./BackDrop";
import ModalOverlay from "./ModalOverlay";

const Modal = (props) =>{

    const portal = document.getElementById('modelOverlay')
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop value={props.value}/>,portal)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portal)}
        </Fragment>
    )
}

export default Modal;