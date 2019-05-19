import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { setProductToCart } from "../../store/action/actionBundle";
import StarRatings from "react-star-ratings";
import API from "../../services/api";

class ProductList extends Component {
  delete = id => {
    this.props.delete(id);
  };
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
  }

  getRating = product => {
    let sum = 0;
    const size = Object.keys(product.ratings).length;
    for (let key of Object.keys(product.ratings)) {
      const value = product.ratings[key];
      console.log("value: ", value);
      sum += parseFloat(value);
      console.log("sum after: ", sum);
    }

    const result = sum == 0 ? 0 : parseInt(sum) / size;
    console.log("re: ", result);
    return result;
  };

  renderRatingInfo = product => {
    const average = this.getRating(product).toFixed(1);
    const size = Object.keys(product.ratings).length;
    let info = `${average}/5 (${size} ratings)`;
    return <p className="text-danger">{info}</p>;
  };

  didProductRatedByUser = product => {
    let result;
    const keys = Object.keys(product.ratings);
    for (let key of keys) {
      if (key == this.props.user.id) result = true;
    }
    return result;
  };

  changeRating = (newRating, id) => {
    API.setRating(id, newRating, this.props.user.id).then(() => {
      this.props.getAllProducts();
      this.setState({
        rating: newRating
      });
    });
  };

  render() {
    const imageUrl = "https://via.placeholder.com/100";
    return (
      <div className="scrolling-wrapper p-3">
        {this.props.products.map((product, key) => {
          const editLink = "/editForm/" + product.id;
          const id = product.id;
          if (this.props.user) {
            const isRated = Object.keys(product.ratings).includes(
              this.props.user.id
            );
          }
          {
            this.props.user && this.didProductRatedByUser(product);
          }
          const imagePath = "http://104.248.52.255/images/" + product.imagePath;
          //const testPath =
          //product.id == 9 ? require(imagePath) : product.imagePath;
          //console.log(testPath);
          const url = "http://104.248.52.255/images/" + product.imagePath;

          return (
            <div className="card my-3 h-100">
              <img
                className="card-img-top"
                src={url}
                alt="Card image cap"
                style={{
                  height: 200,
                  aspectRation: 16 / 9,
                  width: "100%",
                  resizeMode: "contain"
                }}
              />

              <div className="card-body">
                <h5
                  className="card-title"
                  style={{
                    color: "#000000"
                  }}
                >
                  {product.name}
                </h5>
                <h5
                  className="card-title"
                  style={{
                    color: "#1a9999"
                  }}
                >
                  {product.price} kr
                </h5>
                <p className="card-text text-dark">{product.ratingInfo}</p>
                {this.renderRatingInfo(product)}
                <div
                  disabled={
                    !this.props.user || this.didProductRatedByUser(product)
                  }
                >
                  {//Object.keys(product.ratings).includes(this.props.user.id) &&
                  !this.props.merchant && (
                    <StarRatings
                      rating={this.getRating(product)}
                      starRatedColor="blue"
                      isAggregateRating={true}
                      changeRating={newRating =>
                        this.changeRating(newRating, product.id)
                      }
                      numberOfStars={5}
                      starDimension={30}
                      name="rating"
                    />
                  )}
                </div>

                <div className="my-3 ">
                  {!this.props.merchant && (
                    <button
                      onClick={() => this.props.setProductToCart(product)}
                      href="#"
                      className="btn btn-light "
                    >
                      {product.quantity > 0 && (
                        <h2>
                          <i class="fas fa-cart-plus text-primary" />
                        </h2>
                      )}

                      {product.quantity <= 0 && (
                        <h2 className="text-danger">Out of stock</h2>
                      )}
                    </button>
                  )}
                  {this.props.merchant && (
                    <Link to={editLink}>
                      <button
                        onClick={this.navigateEditForm}
                        className="btn btn-success btn-lg mr-5 my-3 "
                      >
                        Edit{" "}
                      </button>
                    </Link>
                  )}
                  {this.props.merchant && (
                    <button
                      onClick={() => this.delete(id)}
                      className="btn btn-primary"
                    >
                      delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
  return {
    setProductToCart: product => dispatch(setProductToCart(product))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

/*

  <div className="card my-3 ">
            <img className="card-img-top" src={imageUrl} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{product.id}</h5>
              <p className="card-text">{product.releaseYear}</p>
              <a href="#" className="btn btn-primary">
                Buy
              </a>
            </div>
          </div>

*/
