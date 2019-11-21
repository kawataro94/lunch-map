import React from 'react';
import styled from "styled-components";

import SwitchButton from '../atoms/SwitchButton';
import CategoryButton from '../atoms/CategoryButton';
import { Container } from "flux/utils";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';

import StateActionCreators from "../flux/actions/StateActionCreators";
import CurrentStateStore from "../flux/stores/CurrentStateStore";

const Title = styled.h3`
  margin: 0;
  padding: 0 0 0 10px;
`

const Wrap = styled.div`
  display: ${props => props.disable === true ? 'none' : 'block'};
  height: 90px;
`

class SideBar extends React.Component {


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

  AddNewShop = () => {
    StateActionCreators.addNewShop(true);
  }

  render() {
    const { currentStateStore } = this.state;
    return (
      <div>
        <List aria-label="main mailbox folders" style={{ color: 'gray' }}>
          <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title>Lunch Map</Title><SwitchButton />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="main mailbox folders" style={{ paddingLeft: 10 }}>
          <Wrap disable={currentStateStore.canRegisterState} >
            <CategoryButton />
          </Wrap>
          <Wrap disable={!currentStateStore.canRegisterState}>
            <Button variant="contained" color="primary" style={{ margin: '25px 0px 0px 75px' }} onClick={() => this.AddNewShop()}>
              登録する
          </Button>
          </Wrap>
        </List>
      </div>
    );
  }
}

export default Container.create(SideBar);