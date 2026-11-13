import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck, Mail, Lock, User } from "lucide-react";
import { registerThunk } from "../../Store/User/userApi";

export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.userReducer);

    const [formData, setFormData] = useState({
        name: "",
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

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const result = await dispatch(registerThunk(formData)).unwrap();

            toast.success(result.message || "Registration successful!");

            navigate("/otpVerify", {
                state: {
                    email: formData.email
                }
            });

        } catch (error) {
            toast.error(error || "Registration failed");
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
                            Never miss your
                            <span className="text-blue-200">
                                {" "}warranty expiry.
                            </span>
                        </h2>

                        <p className="text-blue-100 mt-6 text-lg leading-relaxed">
                            Keep all your product warranties in one place
                            and receive email reminders before they expire.
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
                            Create Account
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Start protecting your warranties today.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* NAME */}
                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Full Name
                            </label>

                            <div className="relative mt-2">
                                <User
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                                />
                            </div>
                        </div>

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
                            <label className="text-sm font-medium text-slate-700">
                                Password
                            </label>

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
                                    placeholder="Create a password"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition shadow-lg shadow-blue-200 disabled:opacity-60"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    <div className="text-center mt-7 text-sm text-slate-500">
                        Already have an account?

                        <button
                            onClick={() => navigate("/login")}
                            className="ml-1 text-blue-600 font-semibold hover:underline"
                        >
                            Login
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
};


