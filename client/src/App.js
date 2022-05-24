import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

//Protected Router
import ProtectedRoute from "./Redirect/ProtectedRoute";
import ProtectedAuth from "./Redirect/ProtectedAuth";
import ProtectedAdmin from "./Redirect/ProtectedAdmin";

//component
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Landing from "./components/products/Landing";
import ItemsById from "./components/products/ItemsById";
import Item from "./components/products/Item";
import Items from "./components/products/Items";
import UserInformation from "./components/information/UserInformation";
import Order from "./components/order/Order";
import FormInforLogin from "./components/information/FormInforLogin";
import FormUpdateUserInfor from "./components/information/FormUpdateUserInfor";
import Ordered from "./components/ordered/Ordered";
import OrderDetail from "./components/ordered/OrderDetail";

//context
import AuthContextProvider from "./contexts/AuthContext";
import TypeProductContextProvider from "./contexts/TypeProductContext";
import CartContextProvider from "./contexts/CartContext";
import ProductContextProvider from "./contexts/ProductContext";
import OrdersContextProvider from "./contexts/OrdersContext";

//dashboard component
import Dashboard from "./components/dashboard/Dashboard";
import Users from "./components/dashboard/User/Users";
import EditUserForm from "./components/dashboard/User/EditUserForm";
import Cart from "./components/dashboard/Cart/Cart";
import EditCart from "./components/dashboard/Cart/EditCart";
import ProductType from "./components/dashboard/ProductType/ProductType";
import EditTypeForm from "./components/dashboard/ProductType/EditTypeForm";
import Products from "./components/dashboard/Products/Products";
import EditProductsForm from "./components/dashboard/Products/EditProductsForm";
import Orders from "./components/dashboard/Order/Orders";
import EditOrderForm from "./components/dashboard/Order/EditOrderForm";

function App() {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <TypeProductContextProvider>
          <CartContextProvider>
            <OrdersContextProvider>
              <Router>
                <Routes>
                  <Route exact path='/login' element={<ProtectedRoute />}>
                    <Route path='' element={<LoginForm />} />
                  </Route>
                  <Route exact path='/register' element={<ProtectedRoute />}>
                    <Route path='' element={<RegisterForm />} />
                  </Route>
                  <Route exact path='/information' element={<ProtectedAuth />}>
                    <Route path='' element={<UserInformation />}>
                      <Route path='' element={<FormUpdateUserInfor />} />
                      <Route path='password' element={<FormInforLogin />} />
                    </Route>
                  </Route>
                  <Route path='/ordered' element={<Ordered />}></Route>
                  <Route path='/ordered/:id' element={<OrderDetail />} />
                  <Route path='/product/' element={<ItemsById />}>
                    <Route path=':id' element={<Item />} />
                    <Route path='' element={<Items />} />
                  </Route>
                  <Route path='/order' element={<Order />} />
                  <Route path='/dashboard' element={<ProtectedAdmin />}>
                    <Route path='' element={<Dashboard />}>
                      <Route path='users' element={<Users />}></Route>
                      <Route path='users/:id' element={<EditUserForm />} />

                      <Route exact path='carts' element={<Cart />} />
                      <Route exact path='carts/add' element={<EditCart />} />

                      <Route exact path='types' element={<ProductType />} />
                      <Route path='types/:id' element={<EditTypeForm />} />

                      <Route exact path='products' element={<Products />} />
                      <Route
                        exact
                        path='products/:id'
                        element={<EditProductsForm />}
                      />

                      <Route exact path='orders' element={<Orders />} />
                      <Route
                        exact
                        path='orders/:id'
                        element={<EditOrderForm />}
                      />
                    </Route>
                  </Route>
                  <Route exact path='/' element={<Landing />} />
                </Routes>
              </Router>
            </OrdersContextProvider>
          </CartContextProvider>
        </TypeProductContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
