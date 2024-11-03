import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  decrementFromCart,
  fetchCart,
  removeFromCart,
} from "../features/CartSlice";
import useAxios from "../utils/useAxios";
import { useAuthContext } from "../context/AuthContext";

function ShoppingCart() {
  const { user } = useAuthContext();
  const api = useAxios();
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const cartId = JSON.parse(localStorage.getItem("cart"))?._id;

  useEffect(() => {
    dispatch(fetchCart({ cartId, api, userId: user ? user._id : null }));
  }, []);

  const Increment = (productId) => {
    dispatch(
      addToCart({
        api,
        cartId,
        userId: user ? user._id : null,
        productId,
        quantity: 1,
      })
    );
  };

  const Decrement = (itemId) => {
    dispatch(
      decrementFromCart({ api, cartId, userId: user ? user._id : null, itemId })
    );
  };

  if (cart?.items?.length >= 1) {
    return (
      <div className="container mx-auto pt-20 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
          Shopping Cart
        </h1>
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full md:w-2/3">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 md:p-6 mb-6 shadow-lg rounded-lg"
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                  />
                  <div className="ml-4 md:ml-6 text-center md:text-left">
                    <h2 className="font-semibold text-xl md:text-2xl">
                      {item.product.name}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600">
                      ${item.product.price}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center mt-4 md:mt-0">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <button
                      onClick={() => Decrement(item._id)}
                      className="bg-gray-300 text-gray-700 text-lg px-3 py-2 rounded-l hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-4 text-xl text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => Increment(item.product._id)}
                      className="bg-gray-300 text-gray-700 text-lg px-3 py-2 rounded-r hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(
                        removeFromCart({ itemId: item._id, api, cartId })
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 mt-2 sm:mt-0 sm:ml-4 rounded hover:bg-red-600 text-lg w-full sm:w-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/3">
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                Order Summary
              </h2>
              <div className="flex justify-between mb-4 text-lg">
                <span>Subtotal</span>
                <span>${cart.totalPrice}</span>
              </div>

              <div className="flex justify-between font-semibold text-2xl mb-6">
                <span>Total</span>
                <span>${cart.totalPrice}</span>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-xl block text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto text-center h-[50vh] py-20">
        <h1 className="text-4xl font-bold mt-5">Your shopping cart is empty</h1>
      </div>
    );
  }
}

export default ShoppingCart;
