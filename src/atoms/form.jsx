import React from "react";
import ShopStore from "../flux/stores/ShopStore";
import ActionCreator from "../flux/actions/ActionCreator";
import { Container } from "flux/utils";
import styled from "styled-components";

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
`;

const UpdateText = styled.input`
  margin: 10px 0;
  border-radius: 5px;
`;

class Form extends React.Component {
  static getStores() {
    return [ShopStore];
  }

  static calculateState() {
    return {
      shopDetail: ShopStore.getState()
    };
  }

  handleChange = e => {
    this.props.update(e);
    ActionCreator.change();
    console.log(this.state.shopDetail);
  };

  render() {
    return (
      <>
        <form>
          <AboutShop>詳細について</AboutShop>
          <TextArea
            onChange={this.handleChange}
            defaultValue={this.props.shopDetail}
          />
          <UpdateText type="submit" value="登録する" />
        </form>
      </>
    );
  }
}

export default Container.create(Form);
