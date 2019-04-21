import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "./LunchMap.css";
import Foo from "./pages/Foo";
import Home from "./pages/Home";

class LunchMap extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/foo" component={Foo} />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<LunchMap />, document.getElementById("root"));

serviceWorker.unregister();
