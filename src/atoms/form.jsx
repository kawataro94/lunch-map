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
  border: 1px solid rgb(0, 0, 0);
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
      data: ShopStore.getState()
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      stores: []
    };
  }

  handleChange = async e => {
    await ActionCreator.changeDetail(e.target.value);
    this.props.update();
  };

  componentDidMount() {
    const setData = async () => {
      ActionCreator.postDetail(this.props.shopDetail);
      ActionCreator.postId(this.props.id);
    };

    setData();
  }

  render() {
    const { shopDetail } = this.state.data;
    return (
      <>
        <form>
          <AboutShop>詳細について</AboutShop>
          <TextArea onChange={this.handleChange} defaultValue={shopDetail} />
          <UpdateText type="submit" value="登録する" />
        </form>
      </>
    );
  }
}

export default Container.create(Form);
