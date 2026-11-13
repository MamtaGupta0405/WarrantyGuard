import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Create Product
export const createProductThunk = createAsyncThunk(
    "product/create",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(
                "/product/create",
                formData
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product creation failed"
            );
        }
    }
);

// Get All Products
export const getAllProductsThunk = createAsyncThunk(
    "product/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get("/product/all");
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Products fetch failed"
            );
        }
    }
);

// Get Single Product
export const getSingleProductThunk = createAsyncThunk(
    "product/getSingle",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get(
                `/product/single/${id}`
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product not found"
            );
        }
    }
);

// Update Product
export const updateProductThunk = createAsyncThunk(
    "product/update",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.put(
                `/product/update/${id}`,
                formData
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product update failed"
            );
        }
    }
);

// Delete Product
export const deleteProductThunk = createAsyncThunk(
    "product/delete",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.delete(
                `/product/delete/${id}`
            );
            return { ...data, id };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product delete failed"
            );
        }
    }
);