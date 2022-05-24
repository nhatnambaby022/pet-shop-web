import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext, AuthContext } from "../../contexts/contexts";
import { GUESTID } from "../../guest/guest";
const CartMenu = ({ button, className }) => {
  //BUTTON TO ORDER
  let buttonE;
  if (button) {
    buttonE = (
      <Link to='/order'>
        <button className='button-to-order'>Đặt hàng</button>
      </Link>
    );
  } else {
    buttonE = <></>;
  }
  //LOAD USER
  const {
    authState: { user },
  } = useContext(AuthContext);

  //LOAD CART
  const {
    cartState: { items },
    updateCart,
    getAllItemsInCart,
    setCartState,
  } = useContext(CartContext);
  let total = 0;
  //up or down quantily
  const upOrDownQuantily = async (str, quantily, itemID) => {
    if (str == "-") {
      console.log();
      await updateCart(user ? user._id : GUESTID, itemID, quantily - 1);
      getAllItemsInCart();
    } else if (str == "+") {
      await updateCart(user ? user._id : GUESTID, itemID, quantily + 1);
      getAllItemsInCart();
    } else if (str == "0") {
      await updateCart(user ? user._id : GUESTID, itemID, 0);
      getAllItemsInCart();
    }
  };
  //cart is null
  let cartIsNull = <></>;
  if (items.length === 0) {
    cartIsNull = (
      <div
        style={{ padding: "12px 6px", fontSize: "16px", fontStyle: "italic" }}>
        Giỏ hàng rỗng!
      </div>
    );
    buttonE = <></>;
  } else {
    cartIsNull = <> </>;
  }
  return (
    <div className={className}>
      {cartIsNull}
      {items.map((item, index) => {
        total = total + item.price * item.quantily;
        return (
          <div className='cart-item' value={item.item} key={index}>
            <div className='cart-itemImage-layout'>
              <img src={item.pathImage} className='cart-itemImage' />
            </div>
            <div className='cart-item-infor'>
              <p className='li-cart-item '>{item.name}</p>
              <div className='li-cart-item'>
                <span>
                  {`Số lượng: `}
                  <input
                    style={{
                      height: "18px",
                      width: "32px",
                      margin: "0px",
                      border: "none",
                      fontSize: "12px",
                    }}
                    onBlur={() => {
                      getAllItemsInCart();
                    }}
                    onChange={async (e) => {
                      setCartState(item.item, e.target.value);
                      if (parseInt(e.target.value)) {
                        await updateCart(
                          user,
                          item.item,
                          parseInt(e.target.value)
                        );
                      }
                    }}
                    value={item.quantily}
                  />
                </span>
                <button
                  style={{ marginLeft: "6px" }}
                  onClick={(e) => {
                    upOrDownQuantily("+", item.quantily, item.item);
                  }}>
                  +
                </button>
                <button
                  onClick={(e) => {
                    upOrDownQuantily("-", item.quantily, item.item);
                  }}>
                  -
                </button>
              </div>
              <p className='li-cart-item'>{`Đơn giá: ${item.price}`}</p>
            </div>
            <button
              style={{ position: "absolute", right: "9px" }}
              onClick={() => upOrDownQuantily("0", item.quantily, item.item)}>
              x
            </button>
          </div>
        );
      })}
      <div className='totalPrice' value={total}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to='/ordered'>
            <button
              className='button-to-order'
              style={{ margin: "6px 6px 0px 0px" }}>
              Đơn hàng
            </button>
          </Link>
          {buttonE}
        </div>

        <div className='totalPrice-price'>{`Tổng tiền: ${total}`}</div>
      </div>
    </div>
  );
};

export default CartMenu;
