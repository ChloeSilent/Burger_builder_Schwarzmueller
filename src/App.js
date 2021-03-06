import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/orders">
                <Orders />
              </Route>
              <Route exact path="/">
                <BurgerBuilder />
              </Route>
            </Switch>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
