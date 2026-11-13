import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import { otpVerifyThunk } from "../../Store/User/userApi";

export const OtpVerify = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading } = useSelector((state) => state.userReducer);

    // Register page se email aa jayega
    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email not found");
            return;
        }

        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }

        if (otp.length !== 6) {
            toast.error("OTP must be 6 digits");
            return;
        }

        try {
            const result = await dispatch(
                otpVerifyThunk({
                    email,
                    otp
                })
            ).unwrap();

            toast.success(result.message || "OTP verified successfully");

            navigate("/login");

        } catch (error) {
            toast.error(error || "Invalid OTP");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
                        <ShieldCheck size={35} />
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Verify Your Email
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Enter the OTP sent to your email
                    </p>
                </div>

                {/* Email */}
                <div className="mb-5">
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
                <form onSubmit={handleSubmit}>

                    <label className="text-sm font-medium text-slate-700">
                        Enter OTP
                    </label>

                    <div className="relative mt-2">
                        <KeyRound
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength="6"
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="Enter 6 digit OTP"
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none tracking-[0.4em] font-semibold"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition disabled:opacity-60"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                </form>

                {/* Login */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Already verified?

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