import React, { Component } from "react";
import Nav from "./components/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import About from "./components/About";
import Products from "./components/products/Products";
import API from "./services/api";
import ProductList from "./components/products/ProductList";
import ProductFrom from "./components/products/ProductForm";
import EditFrom from "./components/products/EditForm";
import Background from "./bilder/amazonBilde.jpg";
import "./App.css";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import configStore from "./store/configStore";
import { Provider } from "react-redux";
import Cart from "./components/cart/Cart";
import ShippingfForm from "./components/cart/ShippingfForm";
import OrderHistory from "./components/cart/OrderHistory";
import UserProfile from "./components/Users/UserProfile";
import AdminPage from "./components/Users/AdminPage";
import MyProducts from "./components/merchant/MyProducts";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configStore();

var sectionStyle = {
  width: "100%",
  height: "800px",
  paddingtop: 0,
  backgroundImage: `url(${Background})`
};

class App extends Component {
  handleLogout = async event => {
    //await Auth.signOut();

    // this.userHasAuthenticated(false);

    this.props.history.push("/login");
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div>
            <BrowserRouter>
              <div className="App">
                <Nav />
                {/* <section style={sectionStyle}>

            </section> */}
                <Route exact path="/" component={Products} />
                <Route exact path="/products" component={Products} />
                <Route path="/about" component={About} />
                <Route path="/productForm" component={ProductFrom} />
                <Route path="/editForm/:id" component={EditFrom} />
                <Route path="/logIn/" component={Login} />
                <Route path="/register/" component={Register} />
                <Route path="/cart/" component={Cart} />
                <Route path="/shippingform/" component={ShippingfForm} />
                <Route path="/orderHistory/" component={OrderHistory} />
                <Route path="/userProfile/:id" component={UserProfile} />
                <Route path="/adminPage/" component={AdminPage} />
                <Route path="/myproducts/:id" component={MyProducts} />

                <Route to="/signup" />
              </div>
            </BrowserRouter>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
