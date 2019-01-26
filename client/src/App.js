import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PubNavbar from "./components/public/layout/PubNavbar";
import About from "./components/public/about/About";
import Landing from "./components/public/landing/Landing";
import Gallery from "./components/public/gallery/Gallery";
import Form from "./components/public/contact/Form";
import Register from "./components/public/auth/Register";
import Login from "./components/public/auth/Login";
import Profile from "./components/public/auth/Profile";
import Footer from "./components/public/layout/Footer";
import PrivNavbar from "./components/private/layout/PrivNavbar";
import AdminLanding from "./components/private/landing/AdminLanding";

//Loggin actions
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";

//Errors
import NotFound from "./components/errors/NotFound";

if (localStorage.jwtToken) {
  //Set the header token again
  setAuthToken(localStorage.jwtToken);
  //Decode token
  const decodedToken = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthed
  store.dispatch(setCurrentUser(decodedToken));

  //Is the token expired?
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    //Get out.
    //store.dispatch(clearCurrentProfile());
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    const isAdmin = window.location.href.includes("admin");
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {isAdmin ? <PrivNavbar /> : <PubNavbar />}
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/gallery" component={Gallery} />
              <Route exact path="/contact/form" component={Form} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin" component={AdminLanding} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
            {isAdmin ? null : <Footer />}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
