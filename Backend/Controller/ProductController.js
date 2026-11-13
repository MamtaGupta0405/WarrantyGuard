import ProductModel from "../Model/Product.js";
import cloudinary from "../Config/cloudinary.js";

// Create Product
export const createProduct = async (req, res) => {
  let uploadedPublicId = null;

  try {
    const { productName, category, purchaseDate, warrantyEndDate } = req.body;

    // Check required fields
    if (!productName || !category || !purchaseDate || !warrantyEndDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let image = "";
    let imagePublicId = "";

    // Upload image only if user selects a file
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "WarrantyGuard",
        },
      );

      uploadedPublicId = result.public_id;

      image = result.secure_url;
      imagePublicId = result.public_id;
    }

    // Save product in MongoDB
    const product = await ProductModel.create({
      userId: req.id,
      productName,
      category,
      image,
      imagePublicId,
      purchaseDate,
      warrantyEndDate,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    // Delete uploaded image if MongoDB save fails
    if (uploadedPublicId) {
      await cloudinary.uploader.destroy(uploadedPublicId).catch(console.error);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({
      userId: req.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      _id: req.params.id,
      userId: req.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  let newPublicId = null;

  try {
    const product = await ProductModel.findOne({
      _id: req.params.id,
      userId: req.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Image is required during update
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image file",
      });
    }

    // Store old image public ID
    const oldPublicId = product.imagePublicId;

    // Upload new image
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "WarrantyGuard",
      },
    );

    newPublicId = result.public_id;

    // Update product fields
    product.productName = req.body.productName ?? product.productName;

    product.category = req.body.category ?? product.category;

    product.purchaseDate = req.body.purchaseDate ?? product.purchaseDate;

    // Reset reminder flags if warranty date changes
    if (
      req.body.warrantyEndDate &&
      new Date(req.body.warrantyEndDate).getTime() !==
        new Date(product.warrantyEndDate).getTime()
    ) {
      product.monthReminderSent = false;
      product.weekReminderSent = false;
      product.dayReminderSent = false;
    }

    product.warrantyEndDate =
      req.body.warrantyEndDate ?? product.warrantyEndDate;

    // Save new image details
    product.image = result.secure_url;
    product.imagePublicId = result.public_id;

    // Save updated product
    await product.save();

    // Delete old image after successful update
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId).catch(console.error);
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    // Delete newly uploaded image if update fails
    if (newPublicId) {
      await cloudinary.uploader.destroy(newPublicId).catch(console.error);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      _id: req.params.id,
      userId: req.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete product from MongoDB
    await ProductModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.id,
    });

    // Delete image from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
