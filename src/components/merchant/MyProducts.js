import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import ProductList from "../products/ProductList";

import API from "../../services/api";
import { getProducts } from "../../store/action/actions";
//import { getMyProducts } from "../../store/action/actions";

class MyProducts extends Component {
  state = {
    myProducts: []
  };
  delete = id => {
    API.deleteProduct(id)
      .then(() => this.props.getMyProduct())
      .catch(err => console.log(err));
  };

  componentWillMount() {
    this.props.getAllProducts();
    // console.log("this.props.products", this.props.products);
  }
  componentDidMount = () => {
    console.log("this.props.products", this.props.products);
    const myProducts = this.props.products.filter(
      product => product.merchant_id == this.props.user.id
    );
    this.setState({ myProducts }, () =>
      console.log("myProducs_", this.state.myProducts)
    );
  };

  render() {
    const shoes = this.state.myProducts.filter(
      product => product.category === "shoes"
    );
    const mobiles = this.state.myProducts.filter(
      product => product.category === "mobile"
    );
    return (
      <div>
        {" "}
        <div className="body">
          <div className=" btn-container">
            <Link to="/productForm">
              <button
                onClick={this.navigateProductForm}
                className="btn btn-success btn-lg mr-5 my-3 "
              >
                Add Product
              </button>
            </Link>
          </div>

          {shoes && (
            <ProductList
              merchant={true}
              delete={this.delete}
              products={shoes}
            />
          )}
          {mobiles && (
            <ProductList
              merchant={true}
              delete={this.delete}
              products={mobiles}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootReducer.user,
    products: state.rootReducer.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getMyProducts: () => dispatch(getMyProducts())
    getAllProducts: () => dispatch(getProducts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProducts);
