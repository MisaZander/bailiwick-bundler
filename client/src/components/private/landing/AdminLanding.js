import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PrivNavbar from "../layout/PrivNavbar";
import Icon from "./Icon";
import Forbidden from "../../errors/Forbidden";

class AdminLanding extends Component {
  render() {
    return this.props.auth.user.userlevel >= this.props.minlevel ? (
      <div className="adminlanding">
        <PrivNavbar />
        <div className="container">
          <div className="row card-deck">
            <Icon
              icon="edit"
              title="Content Manager"
              description="Fiddle with the text on various pages."
              route="admin/misc"
              buttontext="Fiddle"
              disabled="no"
            />
            <Icon
              icon="address-book"
              title="Black Book"
              description="See a list of registered clients. (Coming soon...)"
              route="#"
              buttontext="Open Book"
              disabled="yes"
            />
            <Icon
              icon="images"
              title="Gallery Manager"
              description="Upload or manage your gallery.(Coming Soon...)"
              route="#"
              buttontext="Develop"
              disabled="yes"
            />
            <Icon
              icon="envelope"
              title="Contact Preferences"
              description="Update your personal contact info and how clients contact you. (Coming soon. For now, update your calling card in the misc options.)"
              route="#"
              buttontext="Do It"
              disabled="yes"
            />
          </div>
        </div>
      </div>
    ) : (
      <Forbidden />
    );
  }
}

AdminLanding.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(AdminLanding));
