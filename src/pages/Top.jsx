import React from 'react';
import styled from 'styled-components';

import Map from './Map'
import ShopList from './ShopList'
import Header from "../components/Header";

import { Container } from "flux/utils";
import ShopStore from "../flux/stores/ShopStore";
import CurrentStateStore from "../flux/stores/CurrentStateStore";

const FlexWrap = styled.div`
  color: black;
  display: flex;
  position: relative;
  padding-top: 6px;
  height: calc(100vh - 70px);
`;

const ListWrap = styled.div`
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
  overflow:auto;
`;

const MapWrap = styled.div`
  width: 50%;
  right: 0;
`;

class Top extends React.Component {

  static getStores() {
    return [ShopStore, CurrentStateStore];
  }

  static calculateState() {
    return {
      shopStore: ShopStore.getState(),
      currentStateStore: CurrentStateStore.getState()
    };
  }

  constructor(props) {
    super(props);
    this.state = ({
      imageUrls: []
    })
  }

  render() {
    const { currentStateStore } = this.state;

    return (
      <div>
        <Header loginState={currentStateStore.loginState} />
        <FlexWrap>
          <ListWrap><ShopList /></ListWrap>
          <MapWrap><Map /></MapWrap>
        </FlexWrap>
      </div>
    );
  }
}

export default Container.create(Top);