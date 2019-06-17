import React from "react";
import styled from "styled-components";

import InputWithLabel from "./InputWithLabel";

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

class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newShopName: "",
      newShopDetail: ""
    };
  }
  handleChange = async e => {
    console.log(e.target.value);
  };

  render() {
    const { newShopName, newshopDetail } = this.state;
    console.log(newShopName, newshopDetail);
    return (
      <>
        <InputWithLabel
          label="店名"
          margin="10px 0 0 0"
          onChange={this.handleChange}
        />
        <form>
          <AboutShop>詳細について</AboutShop>
          <TextArea onChange={this.handleChange} defaultValue="" />
        </form>
      </>
    );
  }
}

export default AddForm;
