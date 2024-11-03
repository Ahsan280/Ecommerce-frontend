import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../features/ProductSlice";
const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    return state.products;
  });

  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    if (category == "all") {
      setFilteredProducts(products);
      return;
    }
    console.log("Inside useEffect after all", category, filteredProducts);
    setFilteredProducts(
      products.filter((product) => product.category.toLowerCase() === category)
    );
  }, [category]);
  return (
    <div className="pt-20 px-10 mb-10">
      <p className="text-2xl mb-10 font-bold">
        {category.toUpperCase()} Products:
      </p>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
