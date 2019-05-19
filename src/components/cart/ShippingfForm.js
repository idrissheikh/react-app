import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../services/api";
import Link from "react-router-dom";

class ShippingfForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      firstName: "",
      lastName: "",
      address: "",
      postalCode: ""
    };
  }

  handleChange = (event, key) => {
    console.log("value you are typing: ", event.target.value);
    console.log("updating: ", event.target.id);
    this.setState({
      [key]: event.target.value
    });
  };

  nyShipppingsubmet = async event => {
    event.preventDefault();
    const shipping = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      city: this.state.city,
      postalCode: this.state.postalCode,
      user_id: this.props.user.id
    };

    console.log("shipping to add ", shipping);

    console.log(shipping);

    API.postShipping(shipping)
      .then(newShipping => {
        API.postShipping(newShipping.id, newShipping).then(() =>
          this.setState(
            {
              isLoading: false
            },
            () => this.props.onShippingAdded()
          )
        );
      })

      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false
        });
      });
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className="shipping-form">
        <form method="post" onSubmit={this.nyShipppingsubmet}>
          <div class="input-group mb-2 col-sm-12">
            <div class="input-group mb-1">
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="First Name"
                required="required"
                value={this.state.firstName}
                onChange={event => this.handleChange(event, "firstName")}
              />
            </div>
            <div class="input-group mb-1">
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Last Name"
                required="required"
                value={this.state.lastName}
                onChange={event => this.handleChange(event, "lastName")}
              />
            </div>
            <div class="input-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={this.state.address}
                onChange={event => this.handleChange(event, "address")}
              />
            </div>
            <div class="input-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="city"
                value={this.state.city}
                onChange={event => this.handleChange(event, "city")}
              />
            </div>
            <div class="input-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="postalcode"
                value={this.state.postalCode}
                onChange={event => this.handleChange(event, "postalCode")}
              />
            </div>
            <div className="col-sm-12 my-3 mx-auto">
              <button type="submit" className="btn btn-success btn-block">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootReducer.user
  };
};

export default connect(mapStateToProps)(ShippingfForm);
