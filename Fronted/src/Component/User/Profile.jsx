
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    User,
    Mail,
    ShieldCheck,
    CalendarDays,
    ArrowLeft
} from "lucide-react";

export const Profile = () => {
    const navigate = useNavigate();

    const { user, isAuthorized } = useSelector(
        (state) => state.userReducer
    );

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">

                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-circle btn-ghost absolute top-5 left-5"
                >
                    <ArrowLeft size={24} />
                </button>

                <p className="text-lg font-semibold">
                    Please login first
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 px-4 py-10">

            <div className="max-w-3xl mx-auto">

                {/* Back Arrow */}
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-circle btn-ghost mb-5"
                    title="Go Back"
                >
                    <ArrowLeft size={24} />
                </button>

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-base-content">
                        My Profile
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        Manage your personal account information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="card bg-base-100 shadow-xl border border-base-300">

                    {/* Top Section */}
                    <div className="bg-primary p-8 text-primary-content rounded-t-2xl">

                        <div className="flex flex-col sm:flex-row items-center gap-5">

                            <div className="w-24 h-24 rounded-full bg-white text-primary flex items-center justify-center text-4xl font-bold shadow-lg">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>

                            <div className="text-center sm:text-left">

                                <h2 className="text-2xl font-bold">
                                    {user.name}
                                </h2>

                                <p className="opacity-80 mt-1">
                                    {user.email}
                                </p>

                                <div className="badge badge-success gap-1 mt-3 text-white">
                                    <ShieldCheck size={14} />
                                    {isAuthorized
                                        ? "Verified Account"
                                        : "Not Authorized"}
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="p-6 sm:p-8">

                        <h3 className="text-xl font-bold mb-6">
                            Account Information
                        </h3>

                        <div className="space-y-5">

                            {/* Name */}
                            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">

                                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                    <User size={22} />
                                </div>

                                <div>
                                    <p className="text-sm text-base-content/60">
                                        Full Name
                                    </p>

                                    <p className="font-semibold">
                                        {user.name}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">

                                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                    <Mail size={22} />
                                </div>

                                <div>
                                    <p className="text-sm text-base-content/60">
                                        Email Address
                                    </p>

                                    <p className="font-semibold break-all">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* User ID */}
                            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">

                                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                    <CalendarDays size={22} />
                                </div>

                                <div>
                                    <p className="text-sm text-base-content/60">
                                        User ID
                                    </p>

                                    <p className="font-semibold text-sm break-all">
                                        {user.id || user._id}
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="mt-8 p-4 border border-base-300 rounded-xl flex items-center gap-3">

                            <ShieldCheck className="text-success" size={24} />

                            <div>
                                <p className="font-semibold">
                                    Your account is protected
                                </p>

                                <p className="text-sm text-base-content/60">
                                    Your warranty information is securely managed.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
