import {
  TYPE_PRODUCT_LOADED_FAIL,
  TYPE_PRODUCT_LOADED_SUCCESS,
} from "../contexts/constants";

export const TypeProductReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE_PRODUCT_LOADED_SUCCESS:
      return {
        ...state,
        typeProductLoading: false,
        typeProducts: payload,
      };
    case TYPE_PRODUCT_LOADED_FAIL:
      return {
        ...state,
        typeProductLoading: false,
        typeProducts: payload,
      };

    default:
      break;
  }
};
