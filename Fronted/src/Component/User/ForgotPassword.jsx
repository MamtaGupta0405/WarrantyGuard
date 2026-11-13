import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { forgotPasswordThunk } from "../../Store/User/userApi";

export const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.userReducer);

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            const result = await dispatch(
                forgotPasswordThunk({ email })
            ).unwrap();

            toast.success(
                result.message || "OTP sent to your email"
            );

            navigate("/resetPassword", {
                state: {
                    email: email
                }
            });

        } catch (error) {
            toast.error(error || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
                        <ShieldCheck size={36} />
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Forgot Password?
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Enter your email and we'll send you an OTP
                        to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <label className="text-sm font-medium text-slate-700">
                        Email Address
                    </label>

                    <div className="relative mt-2">
                        <Mail
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition disabled:opacity-60"
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>

                </form>

                {/* Back to Login */}
                <button
                    onClick={() => navigate("/login")}
                    className="flex items-center justify-center gap-2 w-full mt-6 text-sm text-slate-500 hover:text-blue-600"
                >
                    <ArrowLeft size={16} />
                    Back to Login
                </button>

            </div>

        </div>
    );
};