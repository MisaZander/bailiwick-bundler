// ./client/src/components/private/misc/AlterLanding.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";

import { alterContent, getContent } from "../../../actions/contentActions";
import isEmpty from "../../../validation/is-empty";
import PrivNavbar from "../layout/PrivNavbar";
import Spinner from "../../common/Spinner";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import docuparser from "../../../utils/M-RFconverter";

const selector = getFormValues("formData");

class AlterLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialized: false,
      fields: {}
    };
  }

  componentDidMount() {
    this.props.getContent("", true);
  }

  componentDidUpdate() {
    if (!isEmpty(this.props.content.content) && !this.state.isInitialized) {
      this.setState({
        isInitialized: true,
        fields: docuparser.MongoToRF(this.props.content.content[0])
      });
    }
  }

  addField = type => {
    //This should tack on a new field to the DB
    //.then() should fetch new content
    let newKey =
      type + "text" + (this.props.content.content[0].data.length + 1);
    let newState = this.state;
    newState.fields[newKey] = "";
    this.setState(newState);
  };

  spliceField = field => {
    //Much like ES6 filter, don't include passed field in new state
    let newState = {},
      oldState = this.state.fields;
    console.log(field);
    console.log(oldState);
    for (let key in oldState) {
      if (oldState.hasOwnProperty(key)) {
        if (key === field) {
          continue; //Wanna splice, skip it
        } else {
          newState[key] = oldState[key];
        }
      }
    }
    console.log(newState);
    this.setState({ fields: newState });
  };

  commit = () => {
    let newDoc = {};
    for (let key in this.props.data) {
      //If property was taken out of state, it will be ignored
      if (this.props.data.hasOwnProperty(key)) {
        if (this.state.fields.hasOwnProperty(key)) {
          newDoc[key] = this.props.data[key];
        } else {
          continue;
        }
      }
    }
    this.props.alterContent("landing", newDoc);
  };

  render() {
    const { content, isLoading } = this.props.content;
    let title,
      blurbs = [],
      cta,
      finishers = [];

    if (isEmpty(content) || isLoading) {
      title = <Spinner />;
    } else {
      //Classic "OR" condition
      if (content[0].contentName === "landing") {
        //Extra percaution
        if (!isEmpty(this.state.fields.title)) {
          title = (
            <TextFieldGroup
              name="title"
              type="text"
              placeholder="Enter a welcoming title for the public..."
              label="Page Title:"
              info="The giant greeting at the top of your page!"
            />
          );
        }
        if (!isEmpty(this.state.fields.calltoaction)) {
          cta = (
            <TextFieldGroup
              name="calltoaction"
              type="text"
              placeholder="The last title the homepage will read..."
              label="Call to Action text:"
              info="This small title will display after your blurbs, but before the finishers."
            />
          );
        }

        //Parse the blurbs
        let index = 1;
        //Check if the first or nth blurb exists
        while (!isEmpty(this.state.fields["blurbtitle" + index])) {
          blurbs.push(
            <div className="card bg-light my-3" key={index}>
              <div className="card-header">
                <h3>{"Blurb " + index + ":"}</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <TextFieldGroup
                    name={"blurbtitle" + index}
                    type="text"
                    placeholder="Enter the title of this blurb..."
                    label="Blurb Title:"
                    info="Title should be a question or attention-getter that entices the client to click the link below"
                  />
                </li>
                <li className="list-group-item">
                  <TextFieldGroup
                    name={"blurbahref" + index}
                    type="text"
                    placeholder="Enter path you want link to go relative to this site"
                    label="Link Location:"
                    info="Enter the URL the button link will take the user to. Ex: enter '/about' to lead to your About page"
                  />
                </li>
                <li className="list-group-item">
                  <TextFieldGroup
                    name={"blurbaval" + index}
                    type="text"
                    placeholder="Enter what the link button will show to the user"
                    label="Link Title:"
                    info="What the text of the link button will say. For example, it should say something like 'Learn More' if the blurb describes you in brief"
                  />
                </li>
                <li className="list-group-item">
                  <TextFieldGroup
                    name={"blurbimg" + index}
                    type="text"
                    placeholder="Enter a filename (Ex: mirror.png)"
                    label="Blurb Image:"
                    info="Enter the FILENAME of an image currently in your gallery, including the file extension"
                  />
                </li>
                <li className="list-group-item">
                  <TextAreaFieldGroup
                    name={"blurbtext" + index}
                    type="text"
                    placeholder="Enter a sentance or two..."
                    label="Blurb Description:"
                    info="Write something short, sweet, and to the point to display in the blurb."
                  />
                </li>
              </ul>
            </div>
          );
          index++;
        } // The blurb while

        for (let i = 1; i < 4; i++) {
          finishers.push(
            <div className="col-4 card" key={i + index}>
              <div className="card-header">
                <h3>{"Finisher " + i + ":"}</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <TextFieldGroup
                    name={"finisherahref" + i}
                    type="text"
                    placeholder="Enter location of site this button should point to..."
                    label={"Finisher " + i + " Location:"}
                    info="Path to another site location"
                  />
                </li>
                <li className="list-group-item">
                  <TextFieldGroup
                    name={"finisheraval" + i}
                    type="text"
                    placeholder="Enter what the link button will show to the user"
                    label={"Finisher " + i + " Link Title:"}
                    info="What the text of the link button will say."
                  />
                </li>
                <li className="list-group-item">
                  <TextAreaFieldGroup
                    name={"finishertext" + i}
                    type="text"
                    placeholder="Enter a sentance or two..."
                    label={"Finisher " + i + " Description:"}
                    info="A quick sentance at the end to convince the user to read more"
                  />
                </li>
              </ul>
            </div>
          );
        }
      } // content === landing sanity check
    } // isLoading else

    return (
      <div>
        <PrivNavbar />
        <div className="container border border-dark">
          <form>
            {title}
            {blurbs}
            {cta}
            <hr className="my-4" />
            <div className="row">{finishers}</div>
          </form>
        </div>
      </div>
    );
  }
}

AlterLanding.propTypes = {
  auth: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired
};

AlterLanding = reduxForm({
  form: "landingForm"
})(AlterLanding);

export default connect(
  state => ({
    auth: state.auth,
    content: state.content,
    data: selector(state)
  }),
  { alterContent, getContent }
)(AlterLanding);
