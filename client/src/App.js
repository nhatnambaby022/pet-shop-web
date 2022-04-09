import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/auth/LoginForm";
import Landing from "./components/products/Landing";
import RegisterForm from "./components/auth/RegisterForm";
import AuthContextProvider from "./contexts/AuthContext";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path='/login' element={<LoginForm />} />
          <Route exact path='/register' element={<RegisterForm />} />
          <Route exact path='/' element={<Landing />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
