import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseDeletePopUp } from '../../Store/Product/productSlice';
import { deleteProductThunk } from '../../Store/Product/productApi';
import toast from 'react-hot-toast';

export const DeleteProduct = () => {
  const dispatch = useDispatch();

  const { product, loading } = useSelector(
    (state) => state.productReducer
  );

  if (!product) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteProductThunk(product._id)).unwrap();

      toast.success('Product deleted successfully!');
      dispatch(CloseDeletePopUp());
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : 'Product delete failed'
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-3 text-xl font-bold">Delete Product</h2>

        <p className="mb-5">
          Are you sure you want to delete{' '}
          <span className="font-bold">{product.productName}</span>?
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>

          <button
            onClick={() => dispatch(CloseDeletePopUp())}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};