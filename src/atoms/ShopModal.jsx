import React from "react";
import styled from "styled-components";
import Modal from "react-modal";

import Form from "./Form";
import Link from '@material-ui/core/Link';

import ActionCreator from "../flux/actions/ActionCreator";
import Chip from '@material-ui/core/Chip';

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

export default ({ store, update, isModal, displayModal }) => {
  const modalToggle = () => {
    displayModal(!isModal);
    if (isModal) {
      ActionCreator.resetShopId();
    }
  };

  const ModalShopName = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    font-weight: bold;
    color: #000;
  `;

  const tagColor = () => {
    if (store.category === "フレンチ") {
      return "secondary"
    } else if (store.category === "和食") {
      return "primary"
    } else if (store.category === "中華") {
      return "normal"
    }
  }


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
      <ModalShopName>{store.shopName}</ModalShopName>
      <Chip size="small" label={store.category} color={tagColor()} />
      <Form update={update} shopDetail={store.shopDetail} id={store.id} />
      <Link href={store.shopLink}>Link</Link>
    </Modal>
  );
};
