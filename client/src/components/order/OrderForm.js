import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  AuthContext,
  CartContext,
  OrdersContext,
} from "../../contexts/contexts";
import { useToasts } from "react-toast-notifications";
import { GUESTID } from "../../guest/guest";

const OrderForm = () => {
  //LOAD ORDER CONTEXT
  const { addOrder } = useContext(OrdersContext);

  //LOAD AUTH
  const {
    authState: { user, isAuthenticated },
  } = useContext(AuthContext);

  //LOAD CART ITEMS
  const {
    cartState: { items },
  } = useContext(CartContext);
  //SET FORM VALUE
  const [userInfor, setUserInfor] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
  });

  //GET VALUE FROM FORM1
  const { fullname, phone, email, address } = userInfor;

  //SET FORM
  const onChangInfor = (event) => {
    setUserInfor({ ...userInfor, [event.target.name]: event.target.value });
  };
  //Dat hang
  const onOrderSubmit = async (e) => {
    e.preventDefault();

    const receive = `${fullname} | ${phone} | ${email} | ${address}`;
    const userId = isAuthenticated ? user._id : GUESTID;
    let price = 0;
    items.forEach((element) => {
      price += element.price * element.quantily;
    });
    await addOrder(userId, price, receive, items);
  };
  return (
    <>
      <form
        className='form-infor'
        style={{ width: "50%", minWidth: "310px", margin: "12px" }}
        onSubmit={onOrderSubmit}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type='checkbox'
            style={{
              width: "18px",
              padding: "0px 0px 0px 0px",
            }}
            onChange={(e) => {
              if (e.target.checked) {
                setUserInfor({ ...user });
              } else {
                setUserInfor({
                  fullname: "",
                  phone: "",
                  email: "",
                  address: "",
                });
              }
            }}
          />{" "}
          <span>D??ng th??ng tin hi???n t???i</span>
        </div>
        <h3>Th??ng tin ?????t h??ng</h3>
        <div>
          <p>H??? v?? t??n</p>
          <input
            type='text'
            placeholder='H??? v?? t??n'
            name='fullname'
            required
            onChange={onChangInfor}
            value={fullname}
          />
        </div>
        <div>
          <p>S??? ??i???n tho???i</p>
          <input
            type='text'
            placeholder='S??? ??i???n tho???i'
            name='phone'
            pattern='0[1-9][0-9]{8}'
            required
            onChange={onChangInfor}
            value={phone}
          />
        </div>
        <div>
          <p>Email</p>
          <input
            type='email'
            placeholder='Email'
            name='email'
            required
            onChange={onChangInfor}
            value={email}
          />
        </div>
        <div>
          <p>?????a ch???</p>
          <textarea
            name='address'
            placeholder='?????a ch???'
            cols='10'
            rows='5'
            required
            style={{ marginTop: "6px", width: "250px" }}
            onChange={onChangInfor}
            value={address}
          />
        </div>
        <br />{" "}
        <button style={{ marginBottom: "24px" }} className='update-button'>
          ?????t h??ng
        </button>
      </form>
    </>
  );
};

export default OrderForm;
