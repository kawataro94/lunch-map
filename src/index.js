import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "./LunchMap.css";
import Map from "./pages/Map";
import Home from "./pages/Home";

class LunchMap extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={Map} />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<LunchMap />, document.getElementById("root"));

serviceWorker.unregister();
