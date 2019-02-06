import React, { Component } from "react";

import { clearContent, getContent } from "../../../actions/contentActions";
import isEmpty from "../../../validation/is-empty";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.props.clearContent();
    this.state = {
      title: "",
      data: []
    };
  }

  componentDidMount() {
    this.props.getContent("about");
  }

  componentDidUpdate(prevProps) {
    //Compare prevProps to superstate data and update this state if so
  }

  addField = type => {};

  spliceField = key => {};

  commit = () => {
    //Send state data to backend
  };

  rollback = () => {
    //Reset state to superstate
  };

  render() {
    return <div />;
  }
}

export default Landing;
