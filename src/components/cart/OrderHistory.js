import React, { Component } from "react";
import { connect } from "react-redux";
import Test from "./test";
import API from "../../services/api";
import { getOrderHistory } from "../../store/action/actions";

class OrderHistory extends Component {
  componentWillMount() {
    this.props.getOrderHistory(this.props.user.id);
  }

  renderProductList = products => {
    return Object.keys(products).map((product, key) => {
      return <h6 key={key}>{products[key].name} </h6>;
    });
  };

  getTotalAmount(order) {
    let sum = 0;
    for (let product of order.products) sum += product.price;
    return sum;
  }

  render() {
    console.log("props.orderHistory: ", this.props.orderHistory);

    return (
      <div>
        <div className="col-sm-10 mx-auto my-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Products</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total amount</th>
              </tr>
            </thead>
            <tbody>
              {this.props.orderHistory.map((order, key) => (
                <tr>
                  <th scope="row">{order.date}</th>
                  <th>{this.renderProductList(order.products)} </th>

                  <td>{order.quantity}</td>
                  <td>{this.getTotalAmount(order)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.rootReducer.products,
    user: state.rootReducer.user,
    orderHistory: state.rootReducer.orderHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: id => dispatch(getOrderHistory(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);
