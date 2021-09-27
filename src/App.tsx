import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Recipes from "./components/Recipes";
import ShoppingList from "./components/ShoppingList";

const App = () => {
  return (
    <Router>
      <div className="container-fluid bg-light">
        <div className="d-flex align-items-center container">
          <h2>Recipes Book</h2>
          <NavLink
            to="/recipes"
            className="link ms-4 me-4"
            activeStyle={{
              fontWeight: "bold",
              color: "black",
              background: "#e2e6e9",
            }}
          >
            Recipes
          </NavLink>
          <NavLink
            to="/shopping-list"
            className="link"
            activeStyle={{
              fontWeight: "bold",
              color: "black",
              background: "#e2e6e9",
            }}
          >
            Shopping List
          </NavLink>
        </div>
      </div>

      <div className="container mt-4">
        <Switch>
          <Route path="/recipes" exact={false}>
            <Recipes />
          </Route>

          <Route path="/shopping-list" exact={false}>
            <ShoppingList />
          </Route>

          <Redirect to="/recipes" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
