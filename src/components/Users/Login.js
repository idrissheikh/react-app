import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./User.css";
import API from "../../services/api";
import DataService from "../../services/dataService";
import {
  setUser,
  getUserShippings,
  getOrderHistory
} from "../../store/action/actionBundle";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.performLogin({
      email: this.state.email,
      password: this.state.password
    })
      .then(user => {
        this.props.setUser(user);
        this.props.getUserShippingList(user);
        this.props.getOrderHistory(user.id);
        this.props.history.push("/");
      })

      .catch(err => console.log(err));
  };

  performLogin = user => {
    console.log("login user: ", user);
    let headers = new Headers({
      "Content-Type": "application/json",

      "Access-Control-Allow-Credentials": "true",
      Authorization: "Basic " + btoa(user.email + ":" + user.password)
    });

    console.log("headers: ", headers);
    const url = "http://104.248.52.255:9090/login";
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: headers
      })
        .then(response => response.json())
        .catch(err => reject(err))

        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  };

  render() {
    return (
      <div styleborder="blue">
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <div>Email</div>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <div>Password</div>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
    getUserShippingList: user => dispatch(getUserShippings(user)),
    getOrderHistory: id => dispatch(getOrderHistory(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
