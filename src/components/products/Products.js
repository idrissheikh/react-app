import React, { Component } from "react";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "react-js-search";
import API from "../../services/api";
import { getProducts } from "../../store/action/actions";

class Products extends Component {
  state = {
    searchResult: [],
    searched: false
  };
  delete = id => {
    API.deleteProduct(id)
      .then(() => this.props.getAllProducts())
      .catch(err => console.log(err));
  };

  componentWillMount() {
    this.props.getAllProducts();
  }

  searchProduct = event => {
    const value = event.target.value;
    this.setState({ searched: false });
    if (value) {
      let updatedList = this.props.products;
      updatedList = updatedList.filter(item => {
        return (
          item.name.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1
        );
      });
      this.setState({ searchResult: updatedList, searched: true });
    } else {
      this.setState({ searchResult: [] });
    }
  };

  render() {
    const shoes = this.props.products.filter(
      products => products.category === "shoes"
    );
    const mobiles = this.props.products.filter(
      products => products.category === "mobile"
    );

    // Sjekk om man viser søkeresultater eller vanlige produkter:
    const searchMode =
      this.state.searched && this.state.searchResult.length > 0;
    const emptySerachResult =
      this.state.searched && this.state.searchResult.length == 0;

    return (
      <div className="body">
        <div className=" btn-container">
          {this.props.user && this.props.user.role == "ADMIN" && (
            <Link to="/productForm">
              <button
                onClick={this.navigateProductForm}
                className="btn btn-success btn-lg mr-5 my-3 "
              >
                Add Product
              </button>
            </Link>
          )}
        </div>
        <div className="col-sm-12 my-2">
          <div className="input-group">
            <input
              onChange={this.searchProduct}
              class="form-control"
              type="search"
              placeholder="Search product by name "
            />
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="fas fa-search" />
              </span>
            </div>
          </div>
        </div>
        {emptySerachResult && (
          <h5 className="text-danger mx-auto text-center">
            {" "}
            No product match{" "}
          </h5>
        )}
        {searchMode && (
          <ProductList
            delete={this.delete}
            products={this.state.searchResult}
            getAllProducts={this.props.getAllProducts}
          />
        )}
        {!searchMode && !emptySerachResult && (
          <ProductList
            delete={this.delete}
            products={shoes}
            getAllProducts={this.props.getAllProducts}
          />
        )}
        {!searchMode && !emptySerachResult && (
          <ProductList
            delete={this.delete}
            products={mobiles}
            getAllProducts={this.props.getAllProducts}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.rootReducer.products,
    user: state.rootReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getProducts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
