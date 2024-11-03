import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import ShoppingCart from "./pages/ShoppingCart";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Payment from "./pages/Payment";
import Return from "./pages/Return";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/DashboardComponents/Profile";
import Orders from "./components/DashboardComponents/Orders";
import AdminRoutes from "./utils/AdminRoutes";
import AllProducts from "./components/DashboardComponents/AllProducts";
import AllUsers from "./components/DashboardComponents/AllUsers";

const App = () => {
  const location = useLocation();

  const shouldDisplayFooter = location.pathname !== "/dashboard";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/payment/:orderId"
          element={
            <ProtectedRoutes>
              <Payment />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/return"
          element={
            <ProtectedRoutes>
              <Return />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route path="" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route
            path="products"
            element={
              <AdminRoutes>
                <AllProducts />
              </AdminRoutes>
            }
          />
          <Route
            path="users"
            element={
              <AdminRoutes>
                <AllUsers />
              </AdminRoutes>
            }
          />
        </Route>
      </Routes>
      {shouldDisplayFooter && <Footer />}
    </>
  );
};

export default App;
