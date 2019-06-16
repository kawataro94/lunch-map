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

const UpdateText = styled.input`
  margin: 10px 0;
  border-radius: 5px;
`;

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
      <AddForm />
      <UpdateText type="submit" value="登録する" />
    </Modal>
  );
};
