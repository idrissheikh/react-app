import React, { Component } from "react";
import PaymentForm from "./PaymentForm";
import Shipping from "./ShippingfForm";
import ShippingfForm from "./ShippingfForm";
import products from "../products/ProductList";
import API from "../../services/api";

class Test extends Component {
  state = {
    showShippingForm: false
  };

  pay = () => {
    const user_id = this.props.user.id;
    const date = new Date().toLocaleDateString();
    let productList = [];
    for (let item of this.props.items) {
      productList.push(item.id);
    }

    const body = {
      user_id,
      date,
      productList
    };

    console.log("body: ", body);

    API.postOrder(body)
      .then(newOrder => {
        for (let id of newOrder.productList) {
          API.decreaseProductQuantity(id).then(() => {
            this.props.getAllProducts();
            this.props.deleteCartItems([]);
            this.props.navigate();
          });
        }
      })
      .catch(err => console.log(err));
  };

  renderTab2 = shippings => {
    return (
      <div class="container">
        <h1>Radio Buttons as Cards</h1>

        <div class="row text-primary">
          {shippings.map((shipping, key) => {
            const fullName = shipping.firstName + " " + shipping.lastName;
            const address = shipping.address;
            const city = shipping.postalCode + " " + shipping.city;
            return (
              <div key={key} class="col-md-6 ">
                <label style={{ borderCollapse: "red", borderWidth: 2 }}>
                  <input
                    onChange={e => console.log(e.target.value)}
                    type="radio"
                    value={shipping.id}
                    name="product"
                  />

                  <div class="card " style={{ width: "18rem" }}>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item text-primary">{fullName}</li>
                      <li class="list-group-item text-primary">{address}</li>
                      <li class="list-group-item text-primary">{city}</li>
                    </ul>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    const firstName = this.props.user ? this.props.user.firstName : "";
    const lastName = this.props.user ? this.props.user.lastName : "";
    const adress = this.props.user ? this.props.user.address : "";
    const city = this.props.user ? this.props.user.city : "";
    const postalCode = this.props.user ? this.props.user.postalCode : "";

    console.log("shippingList props: ", this.props.shippingList);
    console.log("shippingList : ", this.props.userShippings);

    return (
      <div className="">
        <div
          className="col-sm-12"
          style={{
            height: 500
          }}
        >
          <div
            className="card mx-auto"
            style={{ borderWidth: 2, width: "80%" }}
          >
            <div className="card-header collapse show">
              <a
                className="collapsed card-link"
                data-toggle="collapse"
                href="#collapseB"
              />
              <ul className="nav nav-tabs">
                <li className="collapsed card-link">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab-1"
                    role="tab"
                  >
                    Order Summary
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab-2"
                    role="tab"
                  >
                    Shipping
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab-3"
                    role="tab"
                  >
                    pay
                  </a>
                </li>
              </ul>
              <div
                id="collapseB"
                className="card card-tabs-1"
                data-parent="#accordion2"
                style={{ width: "100%" }}
              >
                <div className="card-block ">
                  <div
                    className="tab-content"
                    style={{ borderWidth: 2, borderColor: "yellow" }}
                  >
                    <div
                      className="tab-pane active "
                      id="tab-1"
                      data-parent="#accordion2"
                    >
                      <h4 className="">Tab 1</h4>
                      <div className="col-sm-6  ">
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
                            {this.props.items &&
                              this.props.items.map((item, key) => (
                                <tr key={key}>
                                  <th scope="row">{item.id}</th>
                                  <td>{item.name}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.rate}</td>

                                  <td
                                    className="text-danger"
                                    onClick={() => this.props.removeItem(item)}
                                  >
                                    <i className="fas fa-trash" />
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane" id="tab-2" style={{ flex: 1 }}>
                      <div
                        style={{
                          height: null,
                          backgroundColor: "white",
                          borderWidth: 2,
                          borderColor: "red"
                        }}
                      >
                        {this.state.showShippingForm && (
                          <ShippingfForm
                            onShippingAdded={() =>
                              this.setState({ showShippingForm: false })
                            }
                          />
                        )}
                        {!this.state.showShippingForm &&
                          this.renderTab2(this.props.userShippings)}
                      </div>
                    </div>
                    <div className="tab-pane" id="tab-3">
                      <PaymentForm pay={this.pay} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
