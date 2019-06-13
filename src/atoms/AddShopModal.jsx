import React from "react";
import Modal from "react-modal";

import InputWithLabel from "./InputWithLabel";
import Form from "./Form";

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

export default ({ isModal, modalToggle }) => {
  return (
    <Modal isOpen={isModal} style={customStyles} contentLabel="Example Modal">
      <div style={{ marginBottom: "20px" }}>
        <i
          class="material-icons"
          onClick={() => modalToggle()}
          style={{ cursor: "pointer", float: "right" }}
        >
          clear
        </i>
      </div>
      <InputWithLabel
        label="店名"
        // value={template.name}
        margin="10px 0 0 0"
        // onChange={e => handleChange("name", e.target.value)}
      />
      <Form />
    </Modal>
  );
};
