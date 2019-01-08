import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer bg-light mt-3 pt-3">
        <div className="container">
          <div className="row">
            <div className="offset-2 col-4">
              <p className="lead text-center">Social Links</p>
            </div>
            <div className="col-4">
              <p className="lead text-center">&copy; 2019 Zander Studios</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
