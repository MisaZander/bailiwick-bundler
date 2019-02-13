// ./client/src/components/public/landing/Finale.js
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Finale extends Component {
  render() {
    const { calltoaction, finishers } = this.props;
    return (
      <div className="w-100">
        <hr />
        <div className="row">
          <div className="col">
            <h1 className="display-4 text-center">{calltoaction}</h1>
            <div className="card-group">
              {finishers.map((finisher, index) => {
                return (
                  <div className="card" key={index}>
                    <div className="card-body">
                      <p className="card-text lead text-center">
                        {finisher["finishertext" + (index + 1)]}
                      </p>
                    </div>
                    <div className="card-footer">
                      <Link to={finisher["finisherahref" + (index + 1)]}>
                        <button
                          type="button"
                          className="btn btn-block btn-info"
                        >
                          {finisher["finisheraval" + (index + 1)]}
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Finale;
