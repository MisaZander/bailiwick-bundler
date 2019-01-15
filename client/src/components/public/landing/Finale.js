import React, { Component } from "react";
import { Link } from "react-router-dom";

class Finale extends Component {
  render() {
    const { finishers } = this.props;
    return (
      <div className="w-100">
        <hr />
        <div className="row">
          <div className="col">
            <h1 className="display-4 text-center">Interested? Act Now!</h1>
            <div className="card-group">
              {finishers.map(finisher => {
                return (
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text lead text-center">
                        {finisher.body}
                      </p>
                    </div>
                    <div className="card-footer">
                      <Link to={finisher.ahref}>
                        <button
                          type="button"
                          className="btn btn-block btn-info"
                        >
                          {finisher.aval}
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
