import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../services/api";
import {
  getOrderHistory,
  setUser,
  getUserShippings,
  getShippings
} from "../../store/action/actions";
import ShippingfForm from "../cart/ShippingfForm";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      firstName: "Idris",
      lastName: "Hamid",
      address: "",
      postalCode: "",
      shippingId: "",
      updatConfirmation: false,
      deleteConfirmation: false,
      password1: "",
      password2: "",
      changePasswordError: "",
      changePasswordErrorText: "",
      changePasswordConfirmation: false,
      userId: "",
      showShippingForm: false
    };
  }

  deleteAccount = () => {
    API.deleteUser(this.props.user.id).then(() => {
      this.setState({ deleteConfirmation: true });
      setTimeout(() => {
        this.setState({ deleteConfirmation: false }, () => {
          this.props.setUser(null);
          this.props.history.push("/login");
        });
      }, 3000);
    });
  };

  profileChange = (event, key) => {
    console.log("value you are typing: ", event.target.value);
    console.log("updating: ", event.target.id);
    this.setState({
      [key]: event.target.value
    });
  };

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  changePassword = e => {
    e.preventDefault();
    if (
      this.state.password1.trim() === "" ||
      this.state.password2.trim() === ""
    ) {
      this.setState({
        changePasswordError: true,
        changePasswordErrorText: "You have to fill both password fields"
      });
    }
    if (this.state.password1 !== this.state.password2) {
      this.setState({
        changePasswordError: true,
        changePasswordErrorText: "Passwords must match"
      });
    } else {
      this.setState({ changePasswordError: false });
      API.changePassword(this.state.userId, this.state.password1).then(() =>
        this.setState({ changePasswordConfirmation: true }, () =>
          setTimeout(() => {
            this.setState({ changePasswordConfirmation: false });
            if (this.props.user && this.props.user.roles !== "Admin") {
              this.props.history.push("/login");
            } else {
              this.props.history.push("/adminPage");
            }
          }, 3000)
        )
      );
    }
  };

  profileSubmit = async event => {
    event.preventDefault();

    let updatedUser = this.props.user;
    updatedUser["firstName"] = this.state.firstName;
    updatedUser["lastName"] = this.state.lastName;

    let updateShipping = {
      id: this.state.shippingId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      city: this.state.city,
      postalCode: this.state.postalCode,
      user_id: this.props.user.id
    };

    API.putShipping(updateShipping).then(() =>
      API.updateUser(updatedUser).then(() => {
        this.setState({ updatConfirmation: true });
        setTimeout(() => {
          this.setState({ updatConfirmation: false });
        }, 4000);
      })
    );
  };

  componentWillMount() {
    this.props.getShippings();
    const id = this.props.match.params["id"];
    this.setState({ userId: id });
    API.getUserById(id).then(user => {
      console.log(user);
      API.getshippingById(user.shippingList[0])
        .then(shippingInfo => {
          console.log("shipping info: ", shippingInfo);
          this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: shippingInfo.address,
            city: shippingInfo.city,
            postalCode: shippingInfo.postalCode,
            shippingId: shippingInfo.id
          });
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    console.log(this.state.firstName);
    const userShippings = this.props.shippings.filter(
      shipping => shipping.user_id === this.state.userId
    );
    return (
      <div>
        <div className="col-sm-6 mx-auto ">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link link text-light h5"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Contact Info
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link link text-light h5"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Shipping Info
              </a>
            </li>
          </ul>
        </div>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="signup-form">
              {this.state.deleteConfirmation && (
                <div class="alert alert-danger mx-auto" role="alert">
                  The account has been parmenantly deleted
                </div>
              )}
              {this.state.updatConfirmation && (
                <div class="alert alert-success mx-auto" role="alert">
                  The profile been successfully updated
                </div>
              )}
              <form onSubmit={this.profileSubmit}>
                <h2>Profile</h2>

                <div className="form-group">
                  <div className="row">
                    <div className="col-xs-6">
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        placeholder="First Name"
                        required="required"
                        value={this.state.firstName}
                        onChange={event =>
                          this.profileChange(event, "firstName")
                        }
                      />
                    </div>
                    <div className="col-xs-6">
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        placeholder="Last Name"
                        required="required"
                        value={this.state.lastName}
                        onChange={event =>
                          this.profileChange(event, "lastName")
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group" bsSize="large">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={this.state.address}
                    onChange={event => this.profileChange(event, "address")}
                  />
                </div>
                <div className="form-group" bsSize="large">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="city"
                    value={this.state.city}
                    onChange={event => this.profileChange(event, "city")}
                  />
                </div>
                <div className="form-group" bsSize="large">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="postalcode"
                    value={this.state.postalCode}
                    onChange={event => this.profileChange(event, "postalCode")}
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg btn-block"
                  >
                    UPDATE
                  </button>
                </div>
              </form>

              <div className="form-group">
                <button
                  className="btn btn-warning btn-lg btn-block"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                >
                  CHANGE PASSWORD
                </button>

                <div class="collapse" id="collapseExample">
                  <form>
                    {this.state.changePasswordError && (
                      <div class="alert alert-danger mx-auto" role="alert">
                        {this.state.changePasswordErrorText}
                      </div>
                    )}
                    {this.state.changePasswordConfirmation && (
                      <div class="alert alert-success mx-auto" role="alert">
                        Password has been successfully changed.
                      </div>
                    )}

                    <div class="form-group">
                      <label for="exampleInputPassword1">New password</label>
                      <input
                        value={this.state.password1}
                        onChange={e =>
                          this.setState({ password1: e.target.value })
                        }
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">
                        Confirm new password
                      </label>
                      <input
                        value={this.state.password2}
                        onChange={e =>
                          this.setState({ password2: e.target.value })
                        }
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>

                    <button
                      onClick={this.changePassword}
                      type="submit"
                      class="btn btn-primary"
                    >
                      Change
                    </button>
                  </form>
                </div>
              </div>
              <div className="form-group">
                <button
                  onClick={this.deleteAccount}
                  className="btn btn-danger btn-lg btn-block"
                >
                  DELETE ACCOUNT
                </button>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade col-sm-6 mx-auto"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            {this.state.showShippingForm && (
              <ShippingfForm
                onShippingAdded={() => {
                  this.props.getShippings();
                  this.setState({ showShippingForm: false });
                }}
              />
            )}
            {!this.state.showShippingForm &&
              this.props.user &&
              userShippings.map((shipping, key) => {
                const fullName = shipping.firstName + " " + shipping.lastName;
                const address = shipping.address;
                const city = shipping.postalCode + " " + shipping.city;
                return (
                  <div key={key} class="card " style={{ width: "25rem" }}>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item text-primary">{fullName}</li>
                      <li class="list-group-item text-primary">{address}</li>
                      <li class="list-group-item text-primary">{city}</li>
                    </ul>
                  </div>
                );
              })}
            <div className="my-3">
              <button
                onClick={() => this.setState({ showShippingForm: true })}
                className="btn btn-success btn-block  col-sm-9"
              >
                Add new shipping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootReducer.user,
    shippingList: state.rootReducer.userShippingList,
    shippings: state.rootReducer.shippings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: id => dispatch(getOrderHistory(id)),
    setUser: user => dispatch(setUser(user)),
    getShippings: user => dispatch(getShippings(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
