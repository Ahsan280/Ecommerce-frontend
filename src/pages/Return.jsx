import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCart } from "../features/CartSlice";
import useAxios from "../utils/useAxios";
const Return = () => {
  console.log("RETURN");
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const dispatch = useDispatch();
  const api = useAxios();
  useEffect(() => {
    dispatch(fetchCart(api));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(
      `https://ecommerce-backend-v9ku.onrender.com/v1/payment/session-status/?session_id=${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, orderId }),
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status.toLowerCase() === "completed") {
    localStorage.removeItem("cart");
    return (
      <section id="success" className="pt-20 h-[70vh]">
        <p className="text-center">We appreciate your business</p>
        <div className="bg-purple-500 mt-4 mx-auto p-5 h-1/2 w-1/2 rounded-md flex flex-col gap-4 items-center">
          <h1 className="text-white text-2xl text-center ">
            Payment Successfull
          </h1>
          <Link
            className="p-3 bg-white w-1/3 rounded-md hover:bg-black hover:text-white text-center "
            to="/"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return null;
};
export default Return;
