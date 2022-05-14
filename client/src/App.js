import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import AuthContextProvider from "./contexts/AuthContext";
import Landing from "./components/products/Landing";
import ProductContextProvider from "./contexts/ProductContext";
import TypeProductContextProvider from "./contexts/TypeProductContext";
import ItemsById from "./components/products/ItemsById";
import Item from "./components/products/Item";
import Items from "./components/products/Items";
import UserInformation from "./components/information/UserInformation";
import ProtectedRoute from "./Redirect/ProtectedRoute";
import ProtectedAuth from "./Redirect/ProtectedAuth";
import CartContextProvider from "./contexts/CartContext";
import Order from "./components/order/Order";
import FormInforLogin from "./components/information/FormInforLogin";
import FormUpdateUserInfor from "./components/information/FormUpdateUserInfor";
function App() {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <TypeProductContextProvider>
          <CartContextProvider>
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
                <Route path='/product/' element={<ItemsById />}>
                  <Route path=':id' element={<Item />} />
                  <Route path='' element={<Items />} />
                </Route>
                <Route path='/order' element={<Order />} />
                <Route exact path='/' element={<Landing />} />
              </Routes>
            </Router>
          </CartContextProvider>
        </TypeProductContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
