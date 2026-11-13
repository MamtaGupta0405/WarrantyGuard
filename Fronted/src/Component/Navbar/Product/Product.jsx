import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../../../Store/Product/productApi';
import { ProductCard } from './ProductCard';
import { Package, ShieldCheck } from 'lucide-react';

export const Product = () => {
  const dispatch = useDispatch();

  const { products = [], loading, error } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  const activeProducts = products.filter(
    (item) => new Date(item.warrantyEndDate) >= new Date(new Date().toDateString())
  ).length;

  const expiredProducts = products.length - activeProducts;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            Warranty Management
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Products
          </h1>

          <p className="mt-2 text-gray-500">
            Keep track of your products and never miss a warranty expiry.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Package size={23} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {products.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <ShieldCheck size={23} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Warranties</p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeProducts}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <Package size={23} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Expired Products</p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {expiredProducts}
                </h2>
              </div>
            </div>
          </div>

        </div>

        {/* Product List Heading */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              All Products
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your registered products
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            {products.length} Items
          </span>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
            <p className="font-medium text-gray-500">
              Loading products...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-red-50 py-10 text-center text-red-600">
            {error}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />

            <h2 className="text-xl font-bold text-gray-700">
              No Products Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add your first product to start tracking its warranty.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};