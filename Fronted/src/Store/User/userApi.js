import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Register
export const registerThunk = createAsyncThunk(
    "user/register",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/register", formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

// OTP Verify
export const otpVerifyThunk = createAsyncThunk(
    "user/otpVerify",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/otpVerify", formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "OTP verification failed"
            );
        }
    }
);

// Login
export const loginThunk = createAsyncThunk(
    "user/login",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/login", formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

// Forgot Password
export const forgotPasswordThunk = createAsyncThunk(
    "user/forgotPassword",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                "/forgotPassword",
                formData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "OTP send failed"
            );
        }
    }
);

// Reset Password
export const resetPasswordThunk = createAsyncThunk(
    "user/resetPassword",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                "/resetPassword",
                formData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Password reset failed"
            );
        }
    }
);
// Logout
export const logoutThunk = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/logout");

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
);