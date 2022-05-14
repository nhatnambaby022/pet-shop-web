export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "<<DOMAIN NAME PUBLIC>>";
export const PRODUCT_LOADED_FAIL = "PRODUCT_LOADED_FAIL";
export const PRODUCT_LOADED_SUCCESS = "PRODUCT_LOADED_SUCCESS";
export const TYPE_PRODUCT_LOADED_SUCCESS = "TYPE_PRODUCT_LOADED_SUCCESS";
export const TYPE_PRODUCT_LOADED_FAIL = "TYPE_PRODUCT_LOADED_FAIL";
export const SET_CART = "SET_CART";
export const ADD_CART = "ADD_CART";
export const UPDATE_CART = "UPDATE_CART";
