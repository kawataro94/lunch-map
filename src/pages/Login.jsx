import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Redirect } from 'react-router-dom';

import StateActionCreators from '../flux/actions/StateActionCreators';

const FlexWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex
  justify-content: center;
  align-items: center;
  background-color: #E0E0E0;
`

const Title = styled.h1`
  text-align: center;
  margin-top: 30px;
  color: #858585;
`

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: false,
      email: '',
      password: ''
    };
  }


  login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
      this.setState({ login: true });
      StateActionCreators.changeLoginState(true);
    }).catch(e => {
      alert("ログインに失敗しました")
    });
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  }

  render() {
    const { email, password, login } = this.state;
    return (
      <div>
        <FlexWrap>
          <Paper style={{ height: '300px', padding: '0 30px' }} >
            <Title>Login</Title>
            <TextField
              label="Email"
              defaultValue=""
              variant="outlined"
              style={{ display: 'block', marginBottom: '10px' }}
              onChange={this.handleChange('email')}
            />
            <TextField
              label="Passwoed"
              type='password'
              defaultValue=""
              variant="outlined"
              style={{ display: 'block' }}
              onChange={this.handleChange('password')}
            />
            <Button variant="contained" onClick={() => this.login(email, password)} style={{ marginTop: 20 }}>Login</Button>
          </Paper>
        </FlexWrap>
        {login && <Redirect to="/map" />}
      </div>
    );
  }
}

export default Login;