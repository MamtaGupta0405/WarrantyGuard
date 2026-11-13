import { createSlice } from "@reduxjs/toolkit";

import {
    createProductThunk,
    getAllProductsThunk,
    getSingleProductThunk,
    updateProductThunk,
    deleteProductThunk
} from "./productApi";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    success: false,
    message: "",
    isCreatePopUp: false,
    isEditPopUp: false,
    isDeletePopUp: false
};

const productSlice = createSlice({
    name: "product",
    initialState,

    reducers: {
        // Reset State
        resetProductState: (state) => {
            state.product = null;
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = "";
        },

        // Create Popup
        OpenCreatePopUp: (state) => {
            state.isCreatePopUp = true;
        },

        CloseCreatePopUp: (state) => {
            state.isCreatePopUp = false;
        },

        // Edit Popup
        OpenEditPopUp: (state, action) => {
            state.product = action.payload;
            state.isEditPopUp = true;
        },

        CloseEditPopUp: (state) => {
            state.isEditPopUp = false;
            state.product = null;
        },

        // Delete Popup
        OpenDeletePopUp: (state, action) => {
            state.product = action.payload;
            state.isDeletePopUp = true;
        },

        CloseDeletePopUp: (state) => {
            state.isDeletePopUp = false;
            state.product = null;
        }
    },

    extraReducers: (builder) => {

        // Create Product
        builder
            .addCase(createProductThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;

                if (action.payload.product) {
                    state.products.unshift(action.payload.product);
                }

                state.isCreatePopUp = false;
            })
            .addCase(createProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });

        // Get All Products
        builder
            .addCase(getAllProductsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products || [];
                state.error = null;
            })
            .addCase(getAllProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get Single Product
        builder
            .addCase(getSingleProductThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null;
            })
            .addCase(getSingleProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product;
                state.error = null;
            })
            .addCase(getSingleProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Update Product
        builder
            .addCase(updateProductThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;

                const updatedProduct = action.payload.product;

                if (updatedProduct) {
                    state.products = state.products.map((item) =>
                        item._id === updatedProduct._id
                            ? updatedProduct
                            : item
                    );

                    state.product = updatedProduct;
                }

                state.isEditPopUp = false;
            })
            .addCase(updateProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });

        // Delete Product
        builder
            .addCase(deleteProductThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;

                state.products = state.products.filter(
                    (item) => item._id !== action.payload.id
                );

                if (state.product?._id === action.payload.id) {
                    state.product = null;
                }

                state.isDeletePopUp = false;
            })
            .addCase(deleteProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    }
});

export const {
    resetProductState,
    OpenCreatePopUp,
    CloseCreatePopUp,
    OpenEditPopUp,
    CloseEditPopUp,
    OpenDeletePopUp,
    CloseDeletePopUp
} = productSlice.actions;

const productReducer = productSlice.reducer;

export default productReducer;
