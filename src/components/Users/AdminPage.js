import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../services/api";
import { getUsers } from "../../store/action/actions";
import { Link } from "react-router-dom";

class AdminPage extends Component {
  deleteAccount = (id = null) => {
    id = id ? id : this.props.user.id;
    API.deleteUser(id).then(() => {
      this.props.getAllUsers();
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

  profileSubmit = async event => {
    event.preventDefault();

    let updatedUser = this.props.user;
    updatedUser["firstName"] = this.state.password;

    let updateUser = {
      password: this.state.password
    };

    API.updateUser(updatedUser).then(() => {
      this.setState({ updatConfirmation: true });
      setTimeout(() => {
        this.setState({ updatConfirmation: false });
      }, 4000);
    });
  };

  componentWillMount() {
    console.log("inside will mount .. ");
    this.props.getAllUsers();
  }
  render() {
    return (
      <div className="container">
        <div className="col-sm-8 mx-auto my-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th>First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Role</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.users.map((user, key) => {
                const editLink = "/userProfile/" + user.id;
                return (
                  <tr key={key}>
                    <th scope="row">{user.id}</th>
                    <th scope="row">{user.firstName}</th>
                    <th scope="row">{user.lastName}</th>
                    <th scope="row">{user.roles}</th>
                    <td className="text-warning">
                      <Link to={editLink}>
                        <button type="button" class="btn btn-outline-warning">
                          <i class="fas fa-pencil-alt" />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() => this.deleteAccount(user.id)}
                      >
                        <i class="fas fa-trash-alt" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.rootReducer.user,
    users: state.rootReducer.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
