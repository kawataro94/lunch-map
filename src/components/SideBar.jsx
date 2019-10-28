import React from 'react';

import SwitchButton from '../atoms/SwitchButton';
import CategoryButton from '../atoms/CategoryButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const SideBar = () => {

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders" style={{ color: 'gray' }}>
        <ListItem button>
          <ListItemText primary="Lunch-map" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="main mailbox folders" style={{ paddingLeft: 10 }}>
        <CategoryButton />
        <ListItem style={{ marginTop: 30 }}>
          <ListItemText primary="ストアを登録する" />
          <SwitchButton />
        </ListItem>
      </List>
    </div>
  );
}

export default SideBar;