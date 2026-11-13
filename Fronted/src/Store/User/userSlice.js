import { createSlice } from "@reduxjs/toolkit";

import {
    registerThunk,
    otpVerifyThunk,
    loginThunk,
    forgotPasswordThunk,
    resetPasswordThunk,
    logoutThunk
} from "./userApi";


const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthorized: localStorage.getItem("isAuthorized") === "true",
    loading: false,
    error: null,
    success: false,
    message: ""
};


const userSlice = createSlice({

    name: "user",

    initialState,

    reducers: {

        resetUser: (state) => {

            state.user = null;
            state.isAuthorized = false;
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = "";

            localStorage.removeItem("user");
            localStorage.removeItem("isAuthorized");
        }
    },


    extraReducers: (builder) => {

        // ================= REGISTER =================

        builder
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
            })

            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });


        // ================= OTP VERIFY =================

        builder
            .addCase(otpVerifyThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(otpVerifyThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
            })

            .addCase(otpVerifyThunk.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });


        // ================= LOGIN =================

        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(loginThunk.fulfilled, (state, action) => {

                state.loading = false;
                state.success = true;
                state.error = null;

                state.user = action.payload.user;
                state.isAuthorized = true;
                state.message = action.payload.message;

                localStorage.setItem(
                    "user",
                    JSON.stringify(action.payload.user)
                );

                localStorage.setItem(
                    "isAuthorized",
                    "true"
                );
            })

            .addCase(loginThunk.rejected, (state, action) => {

                state.loading = false;
                state.success = false;
                state.error = action.payload;

                state.isAuthorized = false;

                localStorage.removeItem("user");
                localStorage.removeItem("isAuthorized");
            });


        // ================= FORGOT PASSWORD =================

        builder
            .addCase(forgotPasswordThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
            })

            .addCase(forgotPasswordThunk.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });


        // ================= RESET PASSWORD =================

        builder
            .addCase(resetPasswordThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(resetPasswordThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
            })

            .addCase(resetPasswordThunk.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });


        // ================= LOGOUT =================

        builder
            .addCase(logoutThunk.pending, (state) => {

                state.loading = true;
                state.error = null;
            })

            .addCase(logoutThunk.fulfilled, (state, action) => {

                state.loading = false;
                state.success = true;
                state.message = action.payload.message;

                state.user = null;
                state.isAuthorized = false;
                state.error = null;

                // Clear localStorage
                localStorage.removeItem("user");
                localStorage.removeItem("isAuthorized");
            })

            .addCase(logoutThunk.rejected, (state, action) => {

                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });

    }
});


export const { resetUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;