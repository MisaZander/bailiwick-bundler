import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/public/layout/Navbar";
import About from "./components/public/about/About";
import Landing from "./components/public/landing/Landing";
import Gallery from "./components/public/gallery/Gallery";
import Form from "./components/public/contact/Form";
import Footer from "./components/public/layout/Footer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/contact/form" component={Form} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
