import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import './global.css';
import Balance from "./views/Balance";
import Buy from "./views/Buy";
import Home from "./views/Home";
import Load from "./views/Load";
import NotFound from "./views/NotFound";



const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/buy" component={Buy} />
        <Route exact path="/load" component={Load} />
        <Route exact path="/balance" component={Balance} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
