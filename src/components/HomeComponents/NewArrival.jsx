import React, { useEffect } from "react";
import ProductCard from "../ProductCard";

import { useSelector, useDispatch } from "react-redux";
import useAxios from "../../utils/useAxios";
import { fetchProducts } from "../../features/ProductSlice";
const NewArrival = () => {
  const api = useAxios();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products.slice(0, 3));
  const { loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts(api));
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-5">
      <h1 className="text-4xl my-10 font-bold">New Arrivals:</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
        {products.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
};

export default NewArrival;
