import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        
        <Switch>
          {/* <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} /> */}
          <Route path="/" exact />
          <Route path="/about" exact />
        </Switch>
      </Router>
    </>
    
  );
}

export default App;