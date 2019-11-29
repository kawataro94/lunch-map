import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './LunchMap.css';
import Map from './pages/Map';
import Top from './pages/Top';
import Home from './pages/Home';
import Login from './pages/Login';

class LunchMap extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={Map} />
          <Route path="/top" component={Top} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<LunchMap />, document.getElementById('root'));

serviceWorker.unregister();
