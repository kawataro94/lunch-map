import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import AddForm from "./AddForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-20%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "500px"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.1)"
  }
};

export default ({ isModal, modalToggle, addShop }) => {
  return (
    <Modal isOpen={isModal} style={customStyles} contentLabel="Example Modal">
      <div style={{ marginBottom: "20px" }}>
        <i
          className="material-icons"
          onClick={() => modalToggle()}
          style={{ cursor: "pointer", float: "right" }}
        >
          clear
        </i>
      </div>
      <AddForm addShop={addShop} />
    </Modal>
  );
};
