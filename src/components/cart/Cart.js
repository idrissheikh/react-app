import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setProductToCart,
  setUser,
  removeProductFromCart,
  getProducts,
  getShippings,
  clearCartItems
} from "../../store/action/actionBundle";
import CheckoutForm from "./CheckoutForm";
import Test from "./test";
import API from "../../services/api";

class Cart extends Component {
  state = {
    shippingList: []
  };

  componentWillMount = () => {
    this.props.getShippings();
  };

  componentDidMount() {
    const testShipping = [
      {
        firstName: "Moha",
        lastName: "Mohamed",
        address: "Storgata",
        city: "Oslo",
        postalCode: "0182"
      }
    ];
    if (this.props.user) {
      let list = [];
      // for (let id of this.props.user.shippingList) {
      //   API.getshippingById(id)
      //     .then(shipping => list.push(shipping))
      //     .catch(err => console.log("errrrr", err));
      // }

      list.push(testShipping);

      console.log("beforeUpate: ", list);
      this.setState({ shippingList: list });
    }
  }
  renderCartItems = items => {
    return (
      <div className="container">
        <div className="col-sm-6 mx-auto my-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Available</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, key) => (
                <tr key={key}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="col-sm-6 mx-auto">
            <button className="btn btn-success btn-block ">CHECKOUT</button>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const id = this.props.user ? this.props.user.id : 0;
    const userShippings = this.props.shippings.filter(
      shipping => shipping.user_id == id
    );
    console.log("found: ", userShippings);
    return (
      <div>
        <Test
          navigate={() => this.props.history.push("/orderHistory")}
          deleteCartItems={() => this.props.clearCartItems()}
          items={this.props.cartItems}
          user={this.props.user}
          removeItem={this.props.removeItem}
          shippingList={this.state.shippingList}
          getAllProducts={this.props.getAllProducts}
          userShippings={userShippings}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.rootReducer.cartItems,
    user: state.rootReducer.user,
    shippings: state.rootReducer.shippings
  };
};
const mapDispatchToProps = dispatch => {
  return {
    cart_Item: item => dispatch(setProductToCart(item)),
    removeItem: item => dispatch(removeProductFromCart(item)),
    getAllProducts: () => dispatch(getProducts()),
    getShippings: () => dispatch(getShippings()),
    clearCartItems: () => dispatch(clearCartItems())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
