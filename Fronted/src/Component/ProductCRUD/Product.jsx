import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SingleProduct } from "./SingleProduct";
import { getAllProductsThunk } from "../../Store/Product/productApi";

export const Product = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.productReducer,
  );

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <SingleProduct key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Product;
