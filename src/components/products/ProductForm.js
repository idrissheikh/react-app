import React, { Component } from "react";
import { connect } from "react-redux";
import "../../App.css";
import API from "../../services/api";

class ProductForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    // henter data
    const data = new FormData(form);
    // lager en tom formData
    let formData = {};

    for (let key of data.keys()) {
      const value = form.elements[key].value;
      // fyller formData
      if (key === "file") {
        formData[key] = form.elements[key].files[0];
      } else {
        formData[key] = value;
      }
    }

    const user = this.props.user;
    const merchant_id = user ? user.id : 1;

    formData["merchant_id"] = merchant_id;
    console.log("formData:", formData);

    API.postProduct(formData)
      .then(newProduct => this.props.history.push("/products"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="col-sm-6 my-3 mx-auto ml">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-container">
            <label className="mr-auto ml-0">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter product name "
            />
          </div>
          <div className="form-group">
            <label>Quantity </label>
            <input
              name="quantity"
              type="number"
              className="form-control"
              placeholder="Enter quantity "
            />
          </div>
          <div className="form-group">
            <label>Category </label>
            <input
              name="category"
              type="text"
              className="form-control"
              placeholder="Enter category "
            />
          </div>

          <div className="form-group">
            <label>Price </label>
            <input
              name="price"
              type="text"
              className="form-control"
              placeholder="Enter price "
            />
          </div>

          <div className="form-group">
            <label>Image </label>
            <input
              name="file"
              type="file"
              className="form-control"
              placeholder="Upload image "
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.rootReducer.cartItems,
    user: state.rootReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);
