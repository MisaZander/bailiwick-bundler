import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/public/layout/Navbar";
import Landing from "./components/public/landing/Landing";
import Gallery from "./components/public/gallery/Gallery";
import Footer from "./components/public/layout/Footer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/gallery" component={Gallery} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
