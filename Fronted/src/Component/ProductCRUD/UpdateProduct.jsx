
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";

import { CloseEditPopUp } from "../../Store/Product/productSlice";
import { updateProductThunk } from "../../Store/Product/productApi";

export const UpdateProduct = () => {
  const dispatch = useDispatch();

  const { product, loading } = useSelector(
    (state) => state.productReducer
  );

  const [formData, setFormData] = useState({
    productName: product?.productName || "",
    category: product?.category || "",
    purchaseDate: product?.purchaseDate?.slice(0, 10) || "",
    warrantyEndDate: product?.warrantyEndDate?.slice(0, 10) || "",
  });

  // Image state
  const [imageFile, setImageFile] = useState(null);

  if (!product) return null;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, PNG and WEBP images are allowed");
        e.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        e.target.value = "";
        return;
      }

      setImageFile(file);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Image required
    if (!imageFile) {
      toast.error("Please select a new product image");
      return;
    }

    try {
      const data = new FormData();

      data.append("productName", formData.productName);
      data.append("category", formData.category);
      data.append("purchaseDate", formData.purchaseDate);
      data.append("warrantyEndDate", formData.warrantyEndDate);
      data.append("image", imageFile);

      await dispatch(
        updateProductThunk({
          id: product._id,
          formData: data,
        })
      ).unwrap();

      toast.success("Product updated successfully!");

      dispatch(CloseEditPopUp());

    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Product update failed!"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-base-100 p-6 shadow-xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Update Product
            </h2>

            <p className="text-sm opacity-60">
              Update your product warranty details
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(CloseEditPopUp())}
            className="btn btn-circle btn-ghost"
          >
            <X size={22} />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Product Name */}
          <div>
            <label className="mb-1 block font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Home Appliances">Home Appliances</option>
              <option value="Furniture">Furniture</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Purchase Date */}
          <div>
            <label className="mb-1 block font-medium">
              Purchase Date
            </label>

            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Warranty End Date */}
          <div>
            <label className="mb-1 block font-medium">
              Warranty End Date
            </label>

            <input
              type="date"
              name="warrantyEndDate"
              value={formData.warrantyEndDate}
              onChange={handleChange}
              min={formData.purchaseDate || undefined}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Existing Product Image */}
          {product.image && (
            <div>
              <label className="mb-2 block font-medium">
                Current Product Image
              </label>

              <img
                src={product.image}
                alt={product.productName}
                className="h-28 w-28 rounded-xl border object-cover"
              />
            </div>
          )}

          {/* New Image */}
          <div>
            <label className="mb-2 block font-medium">
              New Product Image
              <span className="ml-2 text-sm text-error">
                (Required)
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-base-300 p-4 hover:border-primary">

              <ImagePlus size={28} className="text-primary" />

              <div className="min-w-0">
                <p className="font-medium">
                  Choose New Image
                </p>

                <p className="truncate text-sm opacity-60">
                  {imageFile
                    ? imageFile.name
                    : "JPG, PNG or WEBP (Max 5MB)"}
                </p>
              </div>

              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={() => dispatch(CloseEditPopUp())}
              className="btn btn-ghost"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
