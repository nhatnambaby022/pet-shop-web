import axios from "axios";
import { useReducer, useEffect, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { addCart, addCartToDatabase, initCart } from "../guest/cart/editCart";
import { CartReducer } from "../producers/CartReducer";
import { apiUrl, SET_CART } from "./constants";
import { CartContext, AuthContext } from "./contexts";

const CartContextProvider = ({ children }) => {
  //use cart Producer
  const [cartState, dispatch] = useReducer(CartReducer, {
    user: "",
    items: [],
  });

  //use add toast
  const { addToast } = useToasts();
  //use auth context
  const { authState } = useContext(AuthContext);
  const { isAuthenticated, user } = authState;
  //get all items in cart
  const getAllItemsInCart = async () => {
    try {
      let items = [];
      if (authState.isAuthenticated) {
        const response = await axios.get(`${apiUrl}/cart/`);
        if (response.data.success) {
          const carts = response.data.getCart;
          carts.forEach((cart) => {
            items.push({
              item: cart.item._id,
              name: cart.item.itemName,
              price: cart.item.priceExport,
              pathImage: cart.item.pathImage,
              quantily: cart.quantily,
            });
          });
        }
      } else {
        const cart = JSON.parse(localStorage.getItem("cart"));
        items = cart.items;
      }
      dispatch({
        type: SET_CART,
        payload: items,
      });
    } catch (error) {}
  };

  //set cart state
  const setCartState = (itemID, quantily) => {
    let items = cartState.items;
    const checkItemInCart = (item) => {
      var i;
      for (i = 0; i < items.length; i++) {
        if (items[i].item == item) {
          return { exist: true, index: i };
        }
      }
      return { exist: false };
    };
    const result = checkItemInCart(itemID);
    if (result.exist) {
      items[result.index].quantily = quantily;
      dispatch({ type: SET_CART, payload: items });
    }
  };
  //Add item to cart
  const addItemToCart = async (id) => {
    try {
      let items = [];
      if (isAuthenticated) {
        const result = await addCartToDatabase(id);
        if (result.success) {
          items = result.items;
          addToast("Thêm sản phẩm vào giỏ hàng thành công", {
            appearance: "success",
          });
          dispatch({ type: SET_CART, payload: items });
          return result;
        }
      } else {
        const result = await addCart(id);
        const cart = JSON.parse(localStorage.getItem("cart"));
        items = cart.items;
        dispatch({ type: SET_CART, payload: items });
        if (result.success) {
          addToast("Thêm sản phẩm vào giỏ hàng thành công", {
            appearance: "success",
          });
          return result;
        }
      }
    } catch (error) {
      return { success: false, message: error };
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        initCart();
        getAllItemsInCart();
      } catch (error) {
        return error;
      }
    }
    fetchData();
  }, [authState]);

  //update cart
  const updateCart = async (userID, itemID, quantilyUpdate) => {
    try {
      //check item exist
      const response = await axios.get(`${apiUrl}/items/${itemID}`);
      if (!response.data.success) {
        return response.data;
      } else {
        //check value quantily
        const product = response.data.item;
        if (quantilyUpdate < 0 || quantilyUpdate > product.quantily) {
          return { success: false, message: "Quantily value incorrect!" };
        } else {
          //update
          //check authenticated value
          if (isAuthenticated) {
            //if authenticated, push change to database
            //delete cart if quantily == 0
            if (quantilyUpdate == 0) {
              const deleted = await axios.delete(`${apiUrl}/cart/${itemID}`);
              if (deleted.data.success) {
                addToast("Đã xóa một sản phẩm ra khỏi giỏ hàng", {
                  appearance: "warning",
                });
              }
              return deleted.data;
            }
            //update if quantily != 0
            const result = await axios.put(`${apiUrl}/cart/`, {
              user: userID,
              item: itemID,
              quantily: quantilyUpdate,
            });
            return result.data;
          } else {
            const cart = JSON.parse(localStorage.getItem("cart"));
            const checkItemInCart = (item) => {
              var i;
              for (i = 0; i < cart.items.length; i++) {
                if (cart.items[i].item == item) {
                  return { exist: true, index: i };
                }
              }
              return { exist: false };
            };
            const result = checkItemInCart(itemID);

            //if the user is not authenticated, push change to LocalStorage
            //delete cart if quantily == 0
            if (quantilyUpdate == 0) {
              cart.items.splice(result.index, 1);
              addToast("Đã xóa một sản phẩm ra khỏi giỏ hàng", {
                appearance: "warning",
              });
              localStorage.setItem("cart", JSON.stringify(cart));
            } else {
              cart.items[result.index].quantily = quantilyUpdate;
              localStorage.setItem("cart", JSON.stringify(cart));
            }
            return { success: true, message: "Delete successfull" };
          }
        }
      }
    } catch (error) {}
  };

  //return item type context data
  const cartContextData = {
    setCartState,
    getAllItemsInCart,
    addItemToCart,
    cartState,
    updateCart,
  };
  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
