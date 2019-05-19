import React, { Component } from "react";
import "./ProductList.css";
import API from "../../services/api";

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProduct: {}
    };

    // om jeg bruker ikke fat rr
    //this.editSubmit = this.editSubmit.bind(this);
  }

  //for å hente product id
  componentDidMount() {
    console.log("param id: ", this.props.match.params["id"]);
    const id = this.props.match.params["id"];
    API.getAllProductById(id)
      .then(editProduct => this.setState({ editProduct }))
      .catch(err => console.log(err));
  }

  editSubmit = event => {
    event.preventDefault();

    let formData = this.state.editProduct;
    formData["rate"] = 0;
    const merchant = {
      fristName: "Salem",
      lastName: "ali",
      email: "ali@olsomet.no"
    };
    const body = {
      product: formData,
      merchant
    };

    console.log("data: ", formData);
    console.log("put body: ", body);
    API.putProduct(body)
      .then(() => console.log("updated"))
      .catch(err => console.log(err));
  };

  updateProductName = event => {
    const name = event.target.value;
    let product = this.state.editProduct;
    product.name = name;
    this.setState({ editProduct: product });
  };

  /*updateProducReleaseYear = event => {
    const releaseYear = event.target.value;
    let product = this.state.editProduct;
    product.releaseYear = releaseYear;
    this.setState({ editProduct: product });
  };*/

  updateProducrate = event => {
    const rate = event.target.value;
    let product = this.state.editProduct;
    product.rate = rate;
    this.setState({ editProduct: product });
  };

  updateProductCategory = event => {
    const category = event.target.value;
    let product = this.state.editProduct;
    product.category = category;
    this.setState({ editProduct: product });
  };
  updateProductquantity = event => {
    const quantity = event.target.value;
    let product = this.state.editProduct;
    product.quantity = quantity;
    this.setState({ editProduct: product });
  };

  render() {
    return (
      <div className="col-sm-6 my-3 mx-auto ml">
        <form onSubmit={this.editSubmit}>
          <div className="form-group form-container">
            <label className="mr-auto ml-0">Name</label>
            <input
              value={this.state.editProduct.name}
              onChange={this.updateProductName}
              name="name"
              type="text"
              className="form-control"
              placeholder=""
            />
          </div>

          <div className="form-group">
            <label>Quantity </label>
            <input
              value={this.state.editProduct.quantity}
              onChange={this.updateProductquantity}
              name="quantity"
              type="number"
              className="form-control"
              placeholder="Enter quantity "
            />
          </div>
          <div className="form-group">
            <label>Category </label>
            <input
              value={this.state.editProduct.category}
              onChange={this.updateProductCategory}
              name="category"
              type="text"
              className="form-control"
              placeholder="Enter category "
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default EditForm;
