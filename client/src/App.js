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
import AlterAbout from "./components/private/misc/AlterAbout";

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
                path="/admin/misc/about"
                minlevel={1}
                component={AlterAbout}
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
