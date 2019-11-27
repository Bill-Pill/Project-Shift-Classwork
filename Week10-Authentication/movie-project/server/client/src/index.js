import "./App.css";
import React, { Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import { render } from "react-dom";
import Nav from "./components/Nav";
import App from './components/App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import DiscoverList from './components/discover/DiscoverList'
import DiscoverDetail from './components/discover/DiscoverDetail'
import WatchList from './components/watch-list/WatchList'
import WatchListDetail from './components/watch-list/WatchListDetail'
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Nav />
        <App>
          <Switch>
            <Route exact path="/" component={DiscoverList} />
            
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            
            <Route exact path="/watch-list" component={WatchList} />
            <Route exact path="/watch-list/:id" component={WatchListDetail} />
            
            <Route exact path="/:id" component={DiscoverDetail} />
          </Switch>
        </App>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
