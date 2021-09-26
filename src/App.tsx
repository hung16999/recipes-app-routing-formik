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
      <div className="container">
        <h2>Recipes Book</h2>
        <NavLink to="/recipes" className="me-4">
          Recipes
        </NavLink>
        <NavLink to="/shopping-list">Shopping List</NavLink>

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
