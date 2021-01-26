import "./App.css";
import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Appointment from "./components/pages/Appointment";
import AppointmentManager from "./components/pages/AppointmentManager";
import Contact from "./components/pages/Contact";
import Help from "./components/pages/Help";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Notification from "./components/pages/Notification";
import NotificationManager from "./components/pages/NotificationManager";
import Offer from "./components/pages/Offer";
import OfferManager from "./components/pages/OfferManager";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>

        <Switch>
          <Route path="/appointment/:id?" exact component={Appointment} />
          <Route
            path="/appointmentManager"
            exact
            component={AppointmentManager}
          />
          <Route path="/contact" exact component={Contact} />
          <Route path="/help" exact component={Help} />
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/notification" exact component={Notification} />
          <Route
            path="/notificationManager"
            exact
            component={NotificationManager}
          />
          <Route path="/offer" exact component={Offer} />
          <Route path="/offerManager" exact component={OfferManager} />
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
