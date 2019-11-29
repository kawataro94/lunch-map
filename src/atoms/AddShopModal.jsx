import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import AddForm from "./AddForm";

import { Container } from "flux/utils";
import StateActionCreators from "../flux/actions/StateActionCreators";
import CurrentStateStore from "../flux/stores/CurrentStateStore";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-20%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "600px"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.1)"
  }
};

const IconWrap = styled.div`
  marginBottom: 20px; 
`
const Icon = styled.i`
  cursor: pointer;
  float: right;
`

class AddShopModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      canAddShop: false
    };
  }

  static getStores() {
    return [CurrentStateStore];
  }

  static calculateState() {
    return {
      currentStateStore: CurrentStateStore.getState()
    };
  }

  modalToggle = () => {
    StateActionCreators.openAddShopModal(false);
  };

  render() {
    const { currentStateStore } = this.state
    const { setShopData, categories, lat, lng } = this.props

    return (
      <Modal isOpen={currentStateStore.isActiveAddShopModal} style={customStyles}>
        <IconWrap style={{ marginBottom: "20px" }}>
          <Icon
            className="material-icons"
            onClick={() => this.modalToggle()}
          >
            clear
          </Icon>
        </IconWrap>
        <AddForm setShopData={setShopData} categories={categories} lat={lat} lng={lng} />
      </Modal>
    );
  }
};

export default Container.create(AddShopModal);
