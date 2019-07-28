import React from "react";
import styled from "styled-components";
import ShopStore from "../flux/stores/ShopStore";
import ActionCreator from "../flux/actions/ActionCreator";
import { Container } from "flux/utils";

const AboutShop = styled.h2`
  margin: 5px 0;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 500px;
  height: 350px;
  padding: 10px;
  font-size: 20px;
  border: 1px solid rgb(0, 0, 0);
`;

const UpdateText = styled.div`
  margin: 10px 0;
  border-radius: 5px;
`;

const ShopLabel = styled.h2`
margin: 0;
font-size: 14px;
`;
const Input = styled.input`
width: 300px;
padding: 5px;
border: 1px solid rgb(0, 0, 0);
`;

class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newShopName: "",
      newShopDetail: ""
    };
  }

  static getStores() {
    return [ShopStore];
  }

  static calculateState() {
    return {
      data: ShopStore.getState()
    };
  }

  handleNameChange = async e => {
    this.setState({
      newShopName: e.target.value
    })
  };

  handleDetailChange = async e => {
    this.setState({
      newShopDetail: e.target.value
    })
  };

  addShop = async () => {
    console.log(this.state.newShopName, this.state.newShopDetail)
    await ActionCreator.addShop(this.state.newShopName, this.state.newShopDetail);
    this.props.addShop();
  };

  render() {
    return (
      <>
        <div>
          <ShopLabel>店名</ShopLabel>
        </div>
        <Input type="text" onChange={this.handleNameChange} />
        <form>
          <AboutShop>詳細について</AboutShop>
          <TextArea onChange={this.handleDetailChange} defaultValue="" />
        </form>
        <UpdateText onClick={() => this.addShop()} >登録する</UpdateText>
      </>
    );
  }
}

export default Container.create(AddForm);
