import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import OrderScreen from "./screens/OrderScreen";
import AboutScreen from "./screens/AboutScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          {/* Home */}
          <Route path="/" component={HomeScreen} exact />
          <Route path="/menu/:category?" component={MenuScreen} />

          <Route path="/about" component={AboutScreen} />

          {/* Login */}
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>

          {/* Admin */}
          <Route path="/admin/userlist" component={UserListScreen}></Route>
          <Route path="/admin/user/:id/edit" component={UserEditScreen}></Route>
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
          ></Route>
          <Route
            path="/admin/product/:id/edit"
            component={ProductEditScreen}
          ></Route>

          {/* cart */}
          <Route path="/cart/:id?" component={CartScreen} />

          {/* order */}
          <Route path="/order" component={OrderScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
