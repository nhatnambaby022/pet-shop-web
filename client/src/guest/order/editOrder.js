//------------------ONLY GUEST-----------

//init order
export const initOrder = () => {
  localStorage.setItem("orders", "[]");
};

//add order
export const addOrderToLocalStorage = (order) => {
  let orders = JSON.parse(localStorage.getItem("orders"));
  console.log(!orders);
  if (!orders) {
    orders = [];
  }
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  console.log(orders);
};

//delete order
export const deleteOrderOnLocalStorage = (orderId) => {
  let orders = JSON.parse(localStorage.getItem("orders"));
  let i;
  let index = -1;
  for (i = 0; i < orders.length; i++) {
    if (orders[i]._id == orderId) {
      index = i;
    }
  }
  if (index > -1) {
    orders.splice(index, 1);
  }
  localStorage.setItem("orders", JSON.stringify(orders));
};
