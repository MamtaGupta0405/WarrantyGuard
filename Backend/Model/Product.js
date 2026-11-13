import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    imagePublicId: {
      type: String,
      default: "",
    },

    purchaseDate: {
      type: Date,
      required: true,
    },

    warrantyEndDate: {
      type: Date,
      required: true,
    },

    monthReminderSent: {
      type: Boolean,
      default: false,
    },

    weekReminderSent: {
      type: Boolean,
      default: false,
    },

    dayReminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
