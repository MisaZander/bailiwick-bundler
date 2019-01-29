import React, { Component } from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import PubNavbar from "../layout/PubNavbar";
import Footer from "../layout/Footer";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      message: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    console.log("No.");
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="contact-form">
        <PubNavbar />
        <div className="container border border-dark">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextFieldGroup
                label="Name:"
                name="name"
                placeholder="Enter your name (required)..."
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                label="Email:"
                name="email"
                type="email"
                placeholder="Enter your email (required) ..."
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                label="Phone Number:"
                name="phone"
                placeholder="(###) ###-#### x#### (recommended field)"
                value={this.state.phone}
                onChange={this.onChange}
                error={errors.phone}
              />
              <TextAreaFieldGroup
                label="Message:"
                name="message"
                placeholder="A message to send..."
                value={this.state.message}
                onChange={this.onChange}
                error={errors.message}
              />
              <input
                type="submit"
                value="Send Message"
                className="btn btn-block btn-success mt-4"
              />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Form;
