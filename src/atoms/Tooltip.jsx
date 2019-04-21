import React from "react";
import styled from "styled-components";

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
  }
`;

const ShopName = styled.div`
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: bold;
  color: #000;
`;

export default ({ shopName, lat, lng }) => {
  return (
    <Tip lat={lat} lng={lng}>
      <ShopName>{shopName}</ShopName>
    </Tip>
  );
};
