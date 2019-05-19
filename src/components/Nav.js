import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ProductForm from "./products/ProductForm";
import DataService from "../services/dataService";
import { setUser, clearCartItems } from "../store/action/actionBundle";
import SearchBar from "react-js-search";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };
  }

  handleLogout = () => {
    this.props.setUser(null);
  };

  render() {
    const loggedUser = DataService.getLoggedUser();
    let profileLink = this.props.user ? this.props.user.id : "";
    console.log("logged user render: ", loggedUser);
    return (
      <nav
        class="navbar navbar-expand-lg navbar-secondary"
        style={{
          backgroundColor: "#991a3a"
        }}
      >
        <a class="navbar-brand" href="/">
          <NavLink className="nav-link" to="/products">
            <h6 className="text-dark">Amazon clone </h6>
          </NavLink>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto align-items-center">
            <li class="nav-item">
              <NavLink className="nav-link" to="/products">
                <h5 className="text-light">Products </h5>
              </NavLink>
            </li>

            <li class="nav-item">
              <NavLink className="nav-link" to="/about">
                <h5 className="text-light">About </h5>
              </NavLink>
            </li>

            {this.props.user && this.props.user.roles === "MERCHANT" && (
              <li class="nav-item">
                <NavLink className="nav-link" to="/myproducts/:id">
                  <h5 className="text-light">My Products </h5>
                </NavLink>
              </li>
            )}
            {this.props.user && this.props.user.roles === "MERCHANT" && (
              <li class="nav-item">
                <NavLink className="nav-link" to="/productForm/:id">
                  <h5 className="text-light">Add Product </h5>
                </NavLink>
              </li>
            )}
            {this.props.user && this.props.user.roles === "Admin" && (
              <li class="nav-item">
                <NavLink className="nav-link" to="/adminPage/">
                  <h5 className="text-light">Manage Users </h5>
                </NavLink>
              </li>
            )}
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <div class="mx-5">
              <ul class="ml-auto navbar-nav ml-auto align-items-center   ">
                {this.props.user && (
                  <li class="nav-item mx-2">
                    <NavLink
                      className="nav-link btn  btn-lg"
                      to={"/userProfile/" + this.props.user.id}
                    >
                      <h5 className="text-light">My Profile </h5>
                    </NavLink>
                  </li>
                )}

                {this.props.user && (
                  <li class="nav-item mx-2">
                    <NavLink
                      className="nav-link btn  btn-lg"
                      to={"/orderHistory"}
                    >
                      <h5 className="text-light">My Orders </h5>
                    </NavLink>
                  </li>
                )}

                {!this.props.user && (
                  <li class="nav-item mx-2">
                    <NavLink className="nav-link btn  btn-lg" to="/logIn">
                      <h5 className="text-light">Login </h5>
                    </NavLink>
                  </li>
                )}

                {this.props.user && (
                  <li class="nav-item mx-2">
                    <NavLink
                      onClick={() => {
                        this.props.setUser(null);
                        this.props.clearCartItems();
                      }}
                      className="nav-link btn  btn-lg"
                      to="/logIn"
                    >
                      <h5 className="text-light">Logout </h5>
                    </NavLink>
                  </li>
                )}
                {!this.props.user && (
                  <li class="nav-item mx-2">
                    <NavLink className="nav-link btn  btn-lg" to="/register">
                      <h5 className="text-light">Signup </h5>
                    </NavLink>
                  </li>
                )}
                <li class="nav-item mx-2 ">
                  <div>
                    <NavLink className="nav-link btn  btn-lg" to="/cart">
                      <div class="d-flex flex-row justify-content-center align-items-center">
                        <div class="p-2">
                          {" "}
                          <span class="badge badge-light text-primary">
                            {this.props.cartItems.length}{" "}
                          </span>{" "}
                        </div>
                        <div class="p-2 text-light"> Cart</div>
                      </div>
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootReducer.user,
    cartItems: state.rootReducer.cartItems,
    products: state.rootReducer.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
    clearCartItems: () => dispatch(clearCartItems())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
