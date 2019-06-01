import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import Form from "./form";
import ActionCreator from "../flux/actions/ActionCreator";

const Tip = styled.div`
  position: relative;
  display: inline-block;
  top: -48px;
  margin: 0 -60px;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: #fff;
  border: solid 2px #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  :before {
    content: "";
    position: absolute;
    bottom: -24px;
    left: 50%;
    margin-left: -15px;
    border: 12px solid transparent;
    border-top: 12px solid #fff;
    z-index: 2;
  }
  :after {
    content: "";
    position: absolute;
    bottom: -29px;
    left: 50%;
    margin-left: -17px;
    border: 14px solid transparent;
    border-top: 14px solid #ddd;
    z-index: 1;
  }
  :hover {
    z-index: 100;
    cursor: pointer;
  }
`;

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
    backgroundColor: "rgba(0,0,255,0.1)"
  }
};

const CloseButton = styled.div`
  margin-top: 10px;
  border-radius: 5px;
  text-align: right;
`;

const ShopName = styled.div`
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: bold;
  color: #000;
`;

const ModalShopName = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: bold;
  color: #000;
`;

Modal.setAppElement("#root");

export default ({ shopName, shopDetail, lat, lng, id, setModalId, update }) => {
  const [isModal, displayModal] = useState(false);

  const modalToggle = () => {
    displayModal(!isModal);
    console.log(isModal);
    if (isModal) {
      ActionCreator.resetShopId();
    }
  };

  const shopModal = id => {
    modalToggle();
    setModalId(id);
  };

  return (
    <>
      <Tip lat={lat} lng={lng} onClick={() => shopModal(id)}>
        <ShopName>{shopName}</ShopName>
      </Tip>
      <Modal isOpen={isModal} style={customStyles} contentLabel="Example Modal">
        <CloseButton onClick={() => modalToggle()}>close</CloseButton>
        <ModalShopName>{shopName}</ModalShopName>
        <Form update={update} shopDetail={shopDetail} id={id} />
      </Modal>
    </>
  );
};
