import React, { Component } from "react";

class logOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      newUser: null
    };
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/");
  };

  render() {
    return <div />;
  }
}

export default logOut;
