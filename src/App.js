import React from "react";
import Recipe from "./Recipe";
import Home from "./Home";
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipeInfo from "./RecipeInfo";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/recipe/:id/:title">
            <RecipeInfo />
          </Route>
          <Route path="/recipe">
            <Recipe />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
