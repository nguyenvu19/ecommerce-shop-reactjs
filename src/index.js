import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogComponents from "./components/Blog";
import BlogDetail from "./components/Blog/detail";
import Register from "./components/User/register";
import Login from "./components/User/login";
import Home from "./components/Home";
import BlogComment from "./components/Blog/comment";
import ListComment from "./components/Blog/listComment";
import UserUpdate from "./components/User/UserUpdate";
import AddProduct from "./components/Product/AddProduct";
import MyProduct from "./components/Product/MyProduct";
import EditProduct from "./components/Product/EditProduct";
import ProductHome from "./components/Product/ProductHome";
import ProductDetail from "./components/Product/ProductDetail";
import Cart from "./components/Product/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          {/* <Route index path="/" element={< />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userUpdate" element={<UserUpdate />} />
          <Route path="/blog" exact element={<BlogComponents />} />
          <Route path="/blog-detail/:paramID" element={<BlogDetail />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/my-product" element={<MyProduct />} />
          <Route path="/edit-product/:paramID" element={<EditProduct />} />
          <Route path="/home-product/" element={<ProductHome />} />
          <Route path="/product-detail/:paramID/" element={<ProductDetail />} />
          <Route path="/cart/" element={<Cart />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
