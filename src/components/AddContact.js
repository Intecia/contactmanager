import React, { Component } from "react";
import uuid from "uuid";
import TextInputGroup from "../components/TextInputGroup";
import PropTypes from "prop-types";
import { addContact } from "../actions/contactActions";
import { connect } from "react-redux";
class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
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
    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    };

    this.props.addContact(newContact);
    this.props.history.push("/");
  };

  render() {
    const { name, phone, email, error } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
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
              value="Add Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}
AddContact.propTypes = {
  addContact: PropTypes.func.isRequired
};
export default connect(
  null,
  { addContact }
)(AddContact);
