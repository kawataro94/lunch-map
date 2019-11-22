import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

import StateActionCreators from '../flux/actions/StateActionCreators';


export default ({ loginState }) => {

  const logout = () => {
    StateActionCreators.changeLoginState(false);
  }

  const LoginLink = styled.a`
    text-decoration: none;
    color: black;
  `
  const StyledLink = LoginLink.withComponent(Link);

  return (
    <div style={{ position: 'fix' }}>
      <AppBar position="static" style={{ backgroundColor: 'white' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" style={{ color: 'black', fontWeight: 'bold' }}>LunchMap</Typography>
          {!loginState && <Button variant="contained" style={{ marginLeft: '10px' }}><StyledLink to="/login">Login</StyledLink></Button>}
          {loginState && <Button variant="contained" onClick={() => logout()} >Logout</Button>}
        </Toolbar>
      </AppBar>
    </div>
  )
}