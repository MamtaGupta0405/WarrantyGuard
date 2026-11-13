import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, KeyRound, Lock, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { resetPasswordThunk } from "../../Store/User/userApi";

export const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading } = useSelector((state) => state.userReducer);

    const email = location.state?.email || "";

    const [formData, setFormData] = useState({
        otp: "",
        newPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email not found");
            return;
        }

        if (!formData.otp || !formData.newPassword) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const result = await dispatch(
                resetPasswordThunk({
                    email,
                    otp: formData.otp,
                    newPassword: formData.newPassword
                })
            ).unwrap();

            toast.success(
                result.message || "Password reset successfully"
            );

            navigate("/login");

        } catch (error) {
            toast.error(error || "Password reset failed");
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
                        Reset Password
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Enter the OTP sent to your email and create a new password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Email
                        </label>

                        <div className="relative mt-2">
                            <Mail
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* OTP */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            OTP
                        </label>

                        <div className="relative mt-2">
                            <KeyRound
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        otp: e.target.value.replace(/\D/g, "")
                                    })
                                }
                                maxLength="6"
                                inputMode="numeric"
                                placeholder="Enter 6 digit OTP"
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none tracking-[0.3em]"
                            />
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            New Password
                        </label>

                        <div className="relative mt-2">
                            <Lock
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition disabled:opacity-60"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Remember your password?

                    <button
                        onClick={() => navigate("/login")}
                        className="ml-1 text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </button>
                </p>

            </div>

        </div>
    );
};