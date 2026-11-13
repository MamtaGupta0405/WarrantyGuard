import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { loginThunk } from "../../Store/User/userApi";

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.userReducer);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const result = await dispatch(
                loginThunk(formData)
            ).unwrap();

            toast.success(result.message || "Login successful!");

            navigate("/");

        } catch (error) {
            toast.error(error || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-5xl grid md:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">

                {/* LEFT SIDE */}
                <div className="hidden md:flex bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white flex-col justify-between">

                    <div>
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <ShieldCheck size={28} />
                            </div>

                            <h1 className="text-2xl font-bold">
                                WarrantyCare
                            </h1>
                        </div>

                        <h2 className="text-4xl font-bold mt-16 leading-tight">
                            Welcome
                            <br />
                            <span className="text-blue-200">
                                Back!
                            </span>
                        </h2>

                        <p className="text-blue-100 mt-6 text-lg leading-relaxed">
                            Login to manage your warranties and never
                            miss an expiry reminder.
                        </p>
                    </div>

                    <div className="text-blue-200 text-sm">
                        © 2026 WarrantyCare
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="p-8 md:p-12">

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-800">
                            Login
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Sign in to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* EMAIL */}
                        <div>
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
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-slate-700">
                                    Password
                                </label>

                                <button
                                    type="button"
                                    onClick={() => navigate("/forgotPassword")}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <div className="relative mt-2">
                                <Lock
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition shadow-lg shadow-blue-200 disabled:opacity-60"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                    {/* REGISTER */}
                    <p className="text-center text-sm text-slate-500 mt-7">
                        Don't have an account?

                        <button
                            onClick={() => navigate("/register")}
                            className="ml-1 text-blue-600 font-semibold hover:underline"
                        >
                            Create Account
                        </button>
                    </p>

                </div>

            </div>

        </div>
    );
};