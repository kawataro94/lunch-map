import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import Form from "./Form";
import Link from '@material-ui/core/Link';
import StoreActionCreators from "../flux/actions/StoreActionCreators";
import Chip from '@material-ui/core/Chip';
import Button from "@material-ui/core/Button";

import { deleteShopData } from "../shopData";

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

const ModalShopName = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: bold;
  color: #000;
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

export default ({ store, setShopData, isModal, displayModal }) => {
  const modalToggle = () => {
    displayModal(!isModal);
    if (isModal) {
      StoreActionCreators.resetShopId();
    }
  };

  const tagColor = () => {
    if (store.category === "フレンチ") {
      return "secondary"
    } else if (store.category === "和食") {
      return "primary"
    } else if (store.category === "中華") {
      return "default"
    }
  }

  const clickDeleteButton = id => {
    modalToggle();
    deleteShopData(id);
    setShopData();
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
      <Form setShopData={setShopData} store={store} shopDetail={store.shopDetail} id={store.id} />
      <FlexWrap>
        <Link href={store.shopLink}>Link</Link>
        <Button variant="contained" onClick={() => clickDeleteButton(store.id)}>消去する</Button>
      </FlexWrap>
    </Modal>
  );
};
