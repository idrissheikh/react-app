import React, { Component } from "react";
import API from "../../services/api";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: ""
    };
  }

  shippingSubmit = async event => {
    event.preventDefault();

    const shipping = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      city: this.state.city,
      postalCode: this.state.postalCode
    };

    this.setState({ isLoading: true });
    console.log(shipping);
    API.postShipping(shipping)
      .then(newShipping => {
        console.log("new Shipping: ", newShipping);
        this.setState({
          isLoading: false,
          newShipping
        });
      })

      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
          newShipping: null
        });
      });

    this.setState({ isLoading: false });
  };

  shippingChange = (event, key) => {
    console.log("value you are typing: ", event.target.value);
    console.log("updating: ", event.target.id);
    this.setState({
      [key]: event.target.value
    });
  };
  render() {
    return (
      <div className="container">
        <div
          className="row"
          style={{ paddingTop: "25px", paddingBottom: "25px" }}
        >
          <div className="col-md-12">
            <div id="mainContentWrapper">
              <div className="col-md-8 col-md-offset-2">
                <hr />
                <a href="#" className="btn btn-info" style={{ width: "100%" }}>
                  Continue shopping
                </a>
                <hr />
                <div className="shopping_cart">
                  <form
                    className="form-horizontal"
                    role="form"
                    action=""
                    id="payment-form"
                  >
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title text-light">
                            <a
                              className="customLink"
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne"
                            >
                              <h4 className="font-weight-bold">
                                Review Your Order
                              </h4>
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <div className="items">
                              <div className="col-md-9">
                                <div className="col-sm-6  my-5">
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
                                      {this.props.items.map((item, key) => (
                                        <tr key={key}>
                                          <th scope="row">{item.id}</th>
                                          <td>{item.name}</td>
                                          <td>{item.quantity}</td>
                                          <td>{item.rate}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div style={{ textAlign: "center" }}>
                                  <h5>Order Total : $147.00</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <div style={{ textAlign: "center", width: "100%" }} />
                        </h4>
                      </div>
                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a
                            data-toggle="collapse"
                            data-parent="#accordion"
                            href="#collapseTwo"
                          >
                            <h4 className="font-weight-bold">
                              Contact and Billing Information
                            </h4>
                          </a>
                        </h4>
                      </div>
                      <form onSubmit={this.shippingSubmit}>
                        <div
                          id="collapseTwo"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <b>
                              <h5 className="text-white">
                                {" "}
                                Help us keep your account safe and secure,
                                please verify your billing information.
                              </h5>
                            </b>
                            <br />
                            <br />
                            <table
                              className="table table-striped"
                              style={{ fontWeight: "bold" }}
                            >
                              <tr>
                                <td style={{ width: "175px" }}>
                                  <label for="id_first_name">First name:</label>
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    id="id_first_name"
                                    name="first_name"
                                    required="required"
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={event =>
                                      this.shippingChange(event, "firstName")
                                    }
                                    onChange={event =>
                                      this.shippingChange(event, "firstName")
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: "175px" }}>
                                  <label for="id_last_name">Last name:</label>
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    id="id_last_name"
                                    name="last_name"
                                    required="required"
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={event =>
                                      this.shippingChange(event, "firstName")
                                    }
                                    onChange={event =>
                                      this.shippingChange(event, "lastName")
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: "175px" }}>
                                  <label for="id_address_line_1">
                                    Address:
                                  </label>
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    id="id_address_line_1"
                                    name="address_line_1"
                                    required="required"
                                    type="text"
                                    value={this.state.city}
                                    onChange={event =>
                                      this.shippingChange(event, "city")
                                    }
                                  />
                                </td>
                              </tr>

                              <tr>
                                <td style={{ width: "175px" }}>
                                  <label for="id_city">City:</label>
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    id="id_city"
                                    name="city"
                                    required="required"
                                    type="text"
                                    value={this.state.address}
                                    onChange={event =>
                                      this.shippingChange(event, "address")
                                    }
                                  />
                                </td>
                              </tr>

                              <tr>
                                <td style={{ width: "175px" }}>
                                  <label for="id_postalcode">Postalcode:</label>
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    id="id_postalcode"
                                    name="postalCode"
                                    required="required"
                                    type="text"
                                    value={this.state.postalCode}
                                    onChange={event =>
                                      this.shippingChange(event, "postalCode")
                                    }
                                  />
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success btn-lg btn-block"
                        >
                          save
                        </button>
                      </form>
                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <div style={{ textAlign: "center" }}>
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree"
                              className=" btn   btn-success"
                              id="payInfo"
                              style={{ width: "100%", display: "none" }}
                              onclick="$(this).fadeOut();  
                       document.getElementById('collapseThree').scrollIntoView()"
                            >
                              <h5 className="text-white">
                                Enter Payment Information
                              </h5>
                            </a>
                          </div>
                        </h4>
                      </div>
                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a
                            data-toggle="collapse"
                            data-parent="#accordion"
                            href="#collapseThree"
                          >
                            <b>Payment Information</b>
                          </a>
                        </h4>
                      </div>
                      <div
                        id="collapseThree"
                        className="panel-collapse collapse"
                      >
                        <div className="panel-body">
                          <span className="payment-errors" />

                          <legend />
                          <div className="form-group">
                            <label
                              className="col-sm-3 control-label"
                              for="card-holder-name"
                            >
                              Name on Card
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                stripe-data="name"
                                id="name-on-card"
                                placeholder="Card Holder's Name"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-3 control-label"
                              for="card-number"
                            >
                              Card Number
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                stripe-data="number"
                                id="card-number"
                                placeholder="Debit/Credit Card Number"
                              />
                              <br />
                              <div>
                                <img
                                  className="pull-right"
                                  src="https://s3.amazonaws.com/hiresnetwork/imgs/cc.png"
                                  style={{
                                    maxWidth: "250px",
                                    paddingBottom: "20px"
                                  }}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label
                                className="col-sm-3 control-label"
                                for="expiry-month"
                              >
                                Expiration Date
                              </label>
                              <div className="col-sm-9">
                                <div className="row">
                                  <div className="col-xs-2">
                                    <input className="form-control" />
                                  </div>

                                  <div className="col-xs-5">
                                    <select
                                      className="form-control"
                                      data-stripe="exp-year"
                                      id="card-exp-year"
                                    >
                                      <option value="2016">2016</option>
                                      <option value="2017">2017</option>
                                      <option value="2018">2018</option>
                                      <option value="2019">2019</option>
                                      <option value="2020">2020</option>
                                      <option value="2021">2021</option>
                                      <option value="2022">2022</option>
                                      <option value="2023">2023</option>
                                      <option value="2024">2024</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label
                                className="col-sm-3 control-label"
                                for="cvv"
                              >
                                Card CVC
                              </label>
                              <div className="col-sm-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  stripe-data="cvc"
                                  id="card-cvc"
                                  placeholder="Security Code"
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="col-sm-offset-3 col-sm-9" />
                            </div>

                            <button
                              type="submit"
                              className="btn btn-success btn-lg"
                              style={{ width: "100%" }}
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
