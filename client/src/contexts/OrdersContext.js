import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useToasts } from "react-toast-notifications";
import { GUESTID } from "../guest/guest";
import {
  addOrderToLocalStorage,
  deleteOrderOnLocalStorage,
} from "../guest/order/editOrder";
import { OrdersReducer } from "../producers/OrdersReducer";
import { apiUrl, SET_ORDER } from "./constants";
import { AuthContext, CartContext, OrdersContext } from "./contexts";

const OrdersContextProvider = ({ children }) => {
  const [ordersState, dispatch] = useReducer(OrdersReducer, {
    isLoading: true,
    orders: [],
  });
  //Load cartContext
  const { getAllItemsInCart } = useContext(CartContext);
  //Load authContext
  const {
    authState: { user, isAuthenticated },
  } = useContext(AuthContext);
  //Load Toast
  const { addToast } = useToasts();

  //add order
  const addOrder = async (user, price, receive, items) => {
    if (!user || !price || !receive || !items) {
      return { success: false, message: "One or more is empty!" };
    } else {
      try {
        const response = await axios.post(`${apiUrl}/orders`, {
          user,
          price,
          receive,
          items,
        });

        if (response.data.success) {
          const { newOrder } = response.data;
          const result = await axios.get(
            `${apiUrl}/orderDetail/${newOrder._id}`
          );
          const orderDetail = result.data.orderDetail;
          let order = { ...newOrder, orderDetail };
          if (isAuthenticated) {
            //delete item in cart
            await axios.delete(`${apiUrl}/cart/`);
          } else {
            //add order to LocalStorage
            addOrderToLocalStorage(order);
            loadOrder();
            //delete item in cart
            let cart = JSON.parse(localStorage.getItem("cart"));
            cart.items = [];
            localStorage.setItem("cart", JSON.stringify(cart));
          }
          await getAllItemsInCart();
          addToast("Đặt hàng thành công", { appearance: "success" });

          return response.data;
        } else {
          addToast("Đặt hàng không thành công", { appearance: "warning" });
        }
      } catch (error) {
        return { success: false, message: error };
      }
    }
  };
  //load orders
  const loadOrder = async () => {
    try {
      let orders;
      if (isAuthenticated) {
        const response = await axios.get(`${apiUrl}/orders`);
        orders = response.data.orders;
      } else {
        orders = JSON.parse(localStorage.getItem("orders"));
        let i;
        let ordersUpdate = [];
        let response;
        for (i = 0; i < orders.length; i++) {
          if (orders[i]) {
            response = await axios.get(`${apiUrl}/orders/${orders[i]._id}`);
          }
          if (response.data.success) {
            ordersUpdate.push(response.data.order);
          }
        }
        orders = ordersUpdate;
        localStorage.setItem("orders", JSON.stringify(orders));
      }
      dispatch({ type: SET_ORDER, payload: orders });
      console.log(orders);
    } catch (error) {
      return { success: false, message: error };
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await loadOrder();
      } catch (error) {
        return error;
      }
    }
    fetchData();
  }, [isAuthenticated]);
  //delete orders
  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.post(`${apiUrl}/orders/delete`, {
        user: isAuthenticated ? user._id : GUESTID,
        order: orderId,
      });
      addToast("Đã xóa một đơn hàng", { appearance: "warning" });
      if (isAuthenticated) {
        await loadOrder();
        return response.data;
      } else {
        if (response.data.success) {
          deleteOrderOnLocalStorage(orderId);
          await loadOrder();
        }
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      return { success: false, message: error };
    }
  };

  //data to render in OrderContext
  const ordersContextData = { ordersState, addOrder, loadOrder, deleteOrder };
  return (
    <OrdersContext.Provider value={ordersContextData}>
      {children}
    </OrdersContext.Provider>
  );
};
export default OrdersContextProvider;
