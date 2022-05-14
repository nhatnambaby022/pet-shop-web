import { GUESTID } from "../guest";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";

//-------------------ONLY GUEST-----------------
//add item to cart in LocalStorage
export const addCart = async (item) => {
  try {
    const response = await axios.get(`${apiUrl}/items/${item}`);
    let cart = JSON.parse(localStorage.getItem("cart"));
    //check exist item in database
    if (response.data.success && response.data.item.quantily > 0) {
      const itemInfor = response.data.item;
      //check cart exist
      if (!cart) {
        initCart();
        cart = JSON.parse(localStorage.getItem("cart"));
        cart.items.push({
          item: item,
          name: itemInfor.itemName,
          price: itemInfor.priceExport,
          pathImage: itemInfor.pathImage,
          quantily: 1,
        });
      } else {
        //check items in cart is null or not null
        if (cart.items) {
          //check exist item in cart
          const checkItemInCart = (item) => {
            var i;
            for (i = 0; i < cart.items.length; i++) {
              if (cart.items[i].item == item) {
                return { exist: true, index: i };
              }
            }
            return { exist: false };
          };

          const itemInCart = checkItemInCart(item);
          if (itemInCart.exist) {
            if (cart.items[itemInCart.index].quantily < itemInfor.quantily)
              ++cart.items[itemInCart.index].quantily;
          } else {
            cart.items.push({
              item: item,
              name: itemInfor.itemName,
              price: itemInfor.priceExport,
              pathImage: itemInfor.pathImage,
              quantily: 1,
            });
          }
          //
        } else {
          cart.items.push({
            item: item,
            name: itemInfor.itemName,
            price: itemInfor.priceExport,
            pathImage: itemInfor.pathImage,
            quantily: 1,
          });
        }
      }

      const setCartResult = setCart(cart);
      if (setCartResult.success)
        return { success: true, message: "Add cart successfull" };
      return { success: false, message: setCartResult.message };
    } else {
      return { success: false, message: "Sold out" };
    }
  } catch (error) {
    return error;
  }
};
//set cart
export const setCart = (cart) => {
  const setItem = localStorage.setItem("cart", JSON.stringify(cart));

  return { success: true, message: "Set cart successfull" };
};

//delete cart

// init cart
export const initCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    setCart({
      user: GUESTID,
      items: [],
    });
    console.log({ success: true, message: "Init cart successfull" });
    return { success: true, message: "Init cart successfull" };
  } else {
    return { success: false, message: "Cart already" };
  }
};
//-------------------GUEST AND MEMBER-----------

//--------------------ONLY MEMBER-----------------
//add item to cart in database
export const addCartToDatabase = async (item) => {
  const response = await axios.post(`${apiUrl}/cart`, { item });
  if (response.data.success) {
    const carts = response.data.cart;
    let items = [];
    carts.forEach((cart) => {
      items.push({
        item: cart.item._id,
        name: cart.item.itemName,
        price: cart.item.priceExport,
        pathImage: cart.item.pathImage,
        quantily: cart.quantily,
      });
    });
    return { success: true, items };
  } else {
    return { success: false, message: response.data.message };
  }
};
