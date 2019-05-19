import React, { Component } from "react";

class PaymentForm extends Component {
  render() {
    return (
      <div>
        <form role="form">
          <div class="form-group">
            <label for="username">Full name (on the card)</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-user" />
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                name="username"
                placeholder=""
                required=""
              />
            </div>
          </div>

          <div class="form-group">
            <label for="cardNumber">Card number</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-credit-card" />
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                name="cardNumber"
                placeholder=""
              />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-8">
              <div class="form-group">
                <label>
                  <span class="hidden-xs">Expiration</span>{" "}
                </label>
                <div class="form-inline">
                  <select class="form-control" style={{ width: "45%" }}>
                    <option>MM</option>
                    <option>01 - Janiary</option>
                    <option>02 - February</option>
                    <option>03 - February</option>
                    <option>04 - March</option>
                    <option>05 - May</option>
                    <option>06 - June</option>
                    <option>07 - July</option>
                    <option>08 - August</option>
                    <option>09 - Septemper</option>
                    <option>10 - Octoper</option>
                    <option>11 - Novemper</option>
                    <option>12 - December</option>
                  </select>
                  <span style={{ width: "10%", textAlign: "center" }}> / </span>
                  <select class="form-control" style={{ width: "45%" }}>
                    <option>YY</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label
                  data-toggle="tooltip"
                  title=""
                  data-original-title="3 digits code on back side of the card"
                >
                  CVV <i class="fa fa-question-circle" />
                </label>
                <input class="form-control" required="" type="text" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 mx-auto my-3 ">
            <button
              onClick={() => this.props.pay()}
              class="subscribe btn btn-primary btn-block"
              type="button"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PaymentForm;
