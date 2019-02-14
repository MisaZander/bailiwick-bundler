import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "./components/public/about/About";
import Landing from "./components/public/landing/Landing";
import Gallery from "./components/public/gallery/Gallery";
import Contact from "./components/public/contact/Contact";
import Register from "./components/public/auth/Register";
import Login from "./components/public/auth/Login";
import Profile from "./components/public/auth/Profile";
import AdminLanding from "./components/private/landing/AdminLanding";
import MiscLanding from "./components/private/misc/MiscLanding";
import AlterAbout from "./components/private/misc/AlterAbout";
import AlterLanding from "./components/private/misc/AlterLanding";
import AlterContact from "./components/private/misc/AlterContact";

//Loggin actions
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";

//Errors
import Forbidden from "./components/errors/Forbidden";
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
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/gallery" component={Gallery} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/profile"
                minlevel={0}
                component={Profile}
              />
              <PrivateRoute
                exact
                path="/admin"
                minlevel={1}
                component={AdminLanding}
              />
              <PrivateRoute
                exact
                path="/admin/misc"
                minlevel={1}
                component={MiscLanding}
              />
              <PrivateRoute
                exact
                path="/admin/misc/about"
                minlevel={1}
                component={AlterAbout}
              />
              <PrivateRoute
                exact
                path="/admin/misc/landing"
                minlevel={1}
                component={AlterLanding}
              />
              <PrivateRoute
                exact
                path="/admin/misc/contact"
                minlevel={1}
                component={AlterContact}
              />
              <Route exact path="/forbidden" component={Forbidden} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
