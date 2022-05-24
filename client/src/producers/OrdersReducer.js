import { SET_ORDER } from "../contexts/constants";
export const OrdersReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ORDER:
      return {
        ...state,
        isLoading: false,
        orders: payload,
      };
    default:
      break;
  }
};
