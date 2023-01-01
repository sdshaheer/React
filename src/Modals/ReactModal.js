import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import ModalContext from "./ModalContext";

const ReactModal = (props) => {
  const history = useHistory();
  const modalCtx = useContext(ModalContext);

  const handleClose = () => {
    if (modalCtx.globalMessage === "RESET_PASSWORD_SUCCESS") {
      modalCtx.setShowModal();
      history.push("/AdminLogin");
    }
    if (modalCtx.globalMessage === "RESET_PASSWORD_FAILURE") {
      modalCtx.setShowModal();
    }
    if (modalCtx.globalMessage === "LOGIN_FAILURE") {
      modalCtx.setShowModal();
    }
    if (modalCtx.globalMessage === "EMPTY_SERVICE_BOOKING") {
      modalCtx.setShowModal();
    }
  };

  return (
    <>
      <Modal show={modalCtx.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          {props.enableCancel && (
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          )}
          {props.enableOk && (
            <Button variant="primary" onClick={handleClose}>
              Ok
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ReactModal;
