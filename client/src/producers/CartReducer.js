import { ADD_CART, SET_CART } from "../contexts/constants";
export const CartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CART:
      return {
        ...state,
        items: payload,
      };
    case SET_CART:
      return {
        ...state,
        items: payload,
      };
    default:
      break;
  }
};
