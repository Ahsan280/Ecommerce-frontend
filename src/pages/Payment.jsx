import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
import { useParams } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../features/CartSlice";
import { useAuthContext } from "../context/AuthContext";
const stripePromise = loadStripe(
  "pk_test_51PEAiEKPMahiDoWN4LZDQA52wDwYRC8oHR0WWELi9mllvVfsiEHvRLrhUAygiQ3EzNJFh1gFSCz78gB9Efne7OMX00hALHN1Li"
);

const Payment = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const cartId = JSON.parse(localStorage.getItem("cart"))?._id;
  useEffect(() => {
    dispatch(fetchCart({ api, cartId, userId: user._id }));
  }, []);
  const api = useAxios();
  const { orderId } = useParams();

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session

    return fetch(
      "https://ecommerce-backend-v9ku.onrender.com/api/v1/payment/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, orderId }),
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className="pt-10">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
export default Payment;
