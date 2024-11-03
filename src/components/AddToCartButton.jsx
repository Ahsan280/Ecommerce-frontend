import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "../utils/useAxios";
import { useAuthContext } from "../context/AuthContext";
import { addToCart } from "../features/CartSlice";
const AddToCartButton = ({ product, setLoading }) => {
  const dispatch = useDispatch();
  const api = useAxios();

  const { user } = useAuthContext();
  const handleAddToCart = async () => {
    const cartId = JSON.parse(localStorage.getItem("cart"))?._id;
    setLoading(true);
    await dispatch(
      addToCart({
        api,
        productId: product._id,
        cartId,
        userId: user?._id,
        quantity: 1,
      })
    );
    setLoading(false);
  };
  return (
    <>
      <button
        onClick={handleAddToCart}
        className="bg-purple-500 hover:bg-purple-800 duration-500 w-full text-white font-bold py-2 px-4 rounded mt-5"
      >
        Add To Cart
      </button>
    </>
  );
};

export default AddToCartButton;
