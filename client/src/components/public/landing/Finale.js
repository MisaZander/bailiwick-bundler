import React, { Component } from "react";
import { Link } from "react-router-dom";

class Finale extends Component {
  render() {
    return (
      <div className="w-100">
        <hr />
        <div className="row">
          <div className="col">
            <h1 className="display-4 text-center">Interested? Act Now!</h1>
            <div className="card-group">
              <div className="card">
                <div className="card-body">
                  <p className="card-text lead text-center">
                    Read more about Heather.
                  </p>
                </div>
                <div className="card-footer">
                  <Link to="/about">
                    <button type="button" className="btn btn-block btn-info">
                      Read Bio
                    </button>
                  </Link>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <p className="card-text lead text-center">
                    See more about her work history.
                  </p>
                </div>
                <div className="card-footer">
                  <Link to="/about/document">
                    <button type="button" className="btn btn-block btn-info">
                      View Resume
                    </button>
                  </Link>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <p className="card-text lead text-center">
                    Like what you see? Reach out to learn more!
                  </p>
                </div>
                <div className="card-footer">
                  <Link to="/contact/form">
                    <button type="button" className="btn btn-block btn-info">
                      Send Message
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Finale;
