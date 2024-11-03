import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthContext } from "../context/AuthContext";
import { fetchCart } from "../features/CartSlice";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const api = useAxios();
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState("");
  const { cart, loading } = useSelector((state) => state.cart);
  const cartId = JSON.parse(localStorage.getItem("cart"))?._id;
  const placeOrder = async () => {
    try {
      if (!shippingAddress) {
        Swal.fire({
          icon: "error",
          title: "Please enter a shipping address",
        });
        return;
      }
      const response = await api.post("order/create-order", {
        shippingAddress,
        userId: user._id,
      });
      // localStorage.removeItem("cart");
      navigate(`/payment/${response.data.order._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchCart({ cartId, api, userId: user ? user._id : null }));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!cart || !cart.items) {
    return <p>No items in cart.</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 pt-20">
        <div className="p-5">
          <h1 className="text-2xl font-bold">Checkout:</h1>
          <div className="form bg-gray-100 p-3 rounded-md mt-5 flex flex-col gap-5">
            <p className="text-2xl">Billing Information</p>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Name: {user.fullName}</label>
              <label htmlFor="">Email: {user.email}</label>
              <label htmlFor="">Phone: {user.phoneNumber}</label>
              <label htmlFor="fullName" className="font-semibold">
                Shipping Address
              </label>
              <textarea
                rows={3}
                type="text"
                onChange={(e) => {
                  setShippingAddress(e.target.value);
                }}
                value={shippingAddress}
                className="border border-black rounded-md p-2"
              />
            </div>
            <button
              onClick={placeOrder}
              className="bg-purple-500 rounded-md py-2 text-white hover:bg-purple-700"
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="bg-gray-100 rounded-md p-4 flex flex-col gap-5">
          {cart.items.map((item) => {
            return (
              <div className="flex items-center" key={item._id}>
                <img src={item.product.image} className="w-1/5" alt="" />
                <div className="p-5">
                  <h1 className="text-xl font-bold">{item.product.name}</h1>
                  <p>Price: ${item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center">
            <h1 className="font-bold text-2xl">Total: ${cart.totalPrice}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
