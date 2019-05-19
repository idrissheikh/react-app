import {
  SET_USER,
  GET_PRODUCTS,
  SET_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  GET_ORDER_HISTORY,
  CLEAR_CART_ITEMS,
  GET_USERS,
  GET_USER_SHIPPINGS,
  GET_SHIPPINGS
} from "./actionTypes";
import API from "../../services/api";

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const getProducts = () => dispatch => {
  API.getAllProducts()
    .then(products => dispatch({ type: GET_PRODUCTS, payload: products }))
    .catch(err => console.log("errr: ", err));
};

export const setProductToCart = product => {
  return {
    type: SET_PRODUCT_TO_CART,
    payload: product
  };
};

export const removeProductFromCart = product => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: product
  };
};

export const getOrderHistory = id => dispatch => {
  API.getOrderHistoryByUser(id)
    .then(orderHistory =>
      dispatch({ type: GET_ORDER_HISTORY, payload: orderHistory })
    )
    .catch(err => console.log("errr: ", err));
};

export const clearCartItems = () => {
  return {
    type: CLEAR_CART_ITEMS,
    payload: []
  };
};

export const getUsers = () => dispatch => {
  API.getAllUsers()
    .then(users => dispatch({ type: GET_USERS, payload: users }))
    .catch(err => console.log("errr: ", err));
};

export const getUserShippings = user => dispatch => {
  API.getUserShippings(user)
    .then(shippings =>
      dispatch({ type: GET_USER_SHIPPINGS, payload: shippings })
    )
    .catch(err => console.log("errr: ", err));
};

export const getShippings = () => dispatch => {
  API.getShippings()
    .then(shippings => dispatch({ type: GET_SHIPPINGS, payload: shippings }))
    .catch(err => console.log("errr: ", err));
};
