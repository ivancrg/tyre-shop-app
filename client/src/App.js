import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Appointment from "./components/pages/Appointment";
import Contact from "./components/pages/Contact";
import Help from "./components/pages/Help";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Notification from "./components/pages/Notification";
import Offer from "./components/pages/Offer";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        
        <Switch>
          <Route path="/appointment" exact component={Appointment} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/help" exact component={Help} />
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/notification" exact component={Notification} />
          <Route path="/offer" exact component={Offer} />
        </Switch>

        <Footer />
      </Router>
    </>
    
  );
}

export default App;