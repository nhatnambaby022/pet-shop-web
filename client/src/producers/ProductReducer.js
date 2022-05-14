import {
  PRODUCT_LOADED_SUCCESS,
  PRODUCT_LOADED_FAIL,
} from "../contexts/constants";
export const ProductReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LOADED_SUCCESS:
      return {
        ...state,
        productLoading: false,
        products: payload,
      };
    case PRODUCT_LOADED_FAIL:
      return {
        ...state,
        productLoading: false,
        products: payload,
      };
    default:
      break;
  }
};
