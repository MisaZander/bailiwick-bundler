import React, { Component } from "react";
import Form from "./Form";
import PubNavbar from "../layout/PubNavbar";
import Footer from "../layout/Footer";

class Contact extends Component {
  componentDidMount() {
    //Get content
  }

  render() {
    return (
      <div className="contact-form">
        <PubNavbar />
        <div className="container border border-dark">
          <Form />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Contact;
