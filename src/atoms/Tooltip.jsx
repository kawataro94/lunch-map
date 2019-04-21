import React from "react";
import styled from "styled-components";

const Tip = styled.div`
  position: relative;
  display: inline-block;
  margin: 1.5em 0;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: #e0edff;
  :before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -15px;
    border: 15px solid transparent;
    border-top: 15px solid #e0edff;
  }
`;

const ShopName = styled.div`
  margin: 0;
  padding: 0;
`;

export default shopName => {
  return (
    <Tip>
      <ShopName>{shopName}</ShopName>
    </Tip>
  );
};
