import React, { Component } from "react";

import TextInputGroup from "./TextInputGroup";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getContact, updateContact } from "../actions/contactActions";
class EContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };

  async componentDidMount() {
    const contact = this.state;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone } = nextProps.contact;

    this.setState({
      name,
      email,
      phone
    });
    console.log(nextProps.contact);
  }
  componentWillMount() {
    const { id } = this.props.match.params;
    console.log(this.props.getContact(id));
  }
  onSubmit = e => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name === "") {
      this.setState({ error: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ error: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ error: { phone: "Phone is required" } });
      return;
    }

    const id = this.props.match.params.id;
    console.log(id);

    const updContact = {
      id,
      name,
      email,
      phone
    };

    console.log(updContact);

    this.props.updateContact(updContact);

    // Clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      error: {}
    });

    this.props.history.push("/");
  };

  render() {
    const { name, phone, email, error } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={error.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
              error={error.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={this.onChange}
              error={error.phone}
            />
            <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}
EContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  contact: state.contact.contact
});
export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(EContact);
