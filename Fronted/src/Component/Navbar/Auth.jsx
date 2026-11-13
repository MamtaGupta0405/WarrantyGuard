import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import { Dropdown } from "./Dropdown";

export const Auth = () => {

    const navigate = useNavigate();

    const { isAuthorized, user } = useSelector(
        (state) => state.userReducer
    );

    // User login hai
    if (isAuthorized) {
        return (
            <div className="flex items-center gap-3">

                <div className="text-sm font-semibold text-gray-800">
                    {user?.name || "User"}
                </div>

                {/* Dropdown sirf login hone par */}
                <Dropdown />

            </div>
        );
    }

    // User login nahi hai
    return (
        <div className="flex items-center gap-3">

            <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50"
            >
                <LogIn size={18} />
                Login
            </button>

            <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
            >
                <UserPlus size={18} />
                Register
            </button>

        </div>
    );
};