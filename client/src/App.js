import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PubNavbar from "./components/public/layout/PubNavbar";
import About from "./components/public/about/About";
import Landing from "./components/public/landing/Landing";
import Gallery from "./components/public/gallery/Gallery";
import Form from "./components/public/contact/Form";
import Register from "./components/public/auth/Register";
import Footer from "./components/public/layout/Footer";
import PrivNavbar from "./components/private/layout/PrivNavbar";
import AdminLanding from "./components/private/landing/AdminLanding";

class App extends Component {
  render() {
    const isAdmin = window.location.href.includes("admin");
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {isAdmin ? <PrivNavbar /> : <PubNavbar />}
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/contact/form" component={Form} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/admin" component={AdminLanding} />
            {isAdmin ? null : <Footer />}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
