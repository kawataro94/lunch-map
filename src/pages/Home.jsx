import React from "react";
import styled from "styled-components";
import logo from "../logo.svg";
import "../LunchMap.css";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  color: black;
`;

class Home extends React.Component {
  render() {
    return (
      <Wrap>
        <header className="LunchMap-header">
          <img src={logo} className="LunchMap-logo" alt="logo" />
          <p>Welcome to lunch-map!</p>
          <Link to="/foo">
            <a
              className="LunchMap-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Let's start!
            </a>
          </Link>
        </header>
      </Wrap>
    );
  }
}

export default Home;