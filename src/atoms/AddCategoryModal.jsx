import React from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { Container } from "flux/utils";
import StateActionCreators from "../flux/actions/StateActionCreators";
import CurrentStateStore from "../flux/stores/CurrentStateStore";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { addCategoryData } from "../categoryData";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-20%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "170px"
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

class AddCategoryModal extends React.Component {

  static getStores() {
    return [CurrentStateStore];
  }

  static calculateState() {
    return {
      currentStateStore: CurrentStateStore.getState()
    };
  }

  modalToggle = () => {
    StateActionCreators.openAddCategoryModal(false);
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  }

  addCategory = () => {
    addCategoryData(this.state.newCategory)
    this.props.setCategoriesData()
    StateActionCreators.openAddCategoryModal(false);
  };

  render() {
    const { currentStateStore } = this.state
    return (
      <Modal isOpen={currentStateStore.isActiveAddCategoryModal} style={customStyles}>
        <IconWrap style={{ marginBottom: "20px" }}>
          <Icon
            className="material-icons"
            onClick={() => this.modalToggle()}
          >
            clear
          </Icon>
        </IconWrap>
        <div></div>
        <TextField
          id="outlined-multiline-static"
          label="カテゴリ名"
          multiline
          defaultValue=""
          margin="normal"
          variant="outlined"
          rows="1"
          style={{ width: 400 }}
          onChange={this.handleChange("newCategory")}
        />
        <div style={{ marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={() => this.addCategory()}>登録する</Button>
        </div>
      </Modal>
    );
  }
};

export default Container.create(AddCategoryModal);