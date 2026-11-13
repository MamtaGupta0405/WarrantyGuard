
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  OpenDeletePopUp,
  OpenEditPopUp
} from '../../Store/Product/productSlice';
import {
  Package,
  CalendarDays,
  Clock,
  Pencil,
  Trash2
} from 'lucide-react';

export const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="group w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.productName}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-blue-500">
            <Package size={60} />
          </div>
        )}
      </div>

      <div className="p-5">

        {/* Header */}
        <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Package size={26} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {product.productName}
            </h2>
            <p className="text-sm text-gray-500">
              {product.category}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2 text-blue-600">
              <CalendarDays size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Purchase Date</p>
              <p className="text-sm font-semibold text-gray-800">
                {new Date(product.purchaseDate).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2 text-orange-500">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Warranty End Date</p>
              <p className="text-sm font-semibold text-gray-800">
                {new Date(product.warrantyEndDate).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4">

          <button
            onClick={() => dispatch(OpenEditPopUp(product))}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Pencil size={17} />
            Edit
          </button>

          <button
            onClick={() => dispatch(OpenDeletePopUp(product))}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={17} />
            Delete
          </button>

        </div>
      </div>
    </div>
  );
};
