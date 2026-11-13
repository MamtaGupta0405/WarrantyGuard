import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Package, LogOut, ChevronDown } from "lucide-react";
import { resetUser } from "../../Store/User/userSlice";
import { loginThunk, logoutThunk } from "../../Store/User/userApi";

export const Dropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
   dispatch(logoutThunk())
   navigate('/')
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100"
      >
        <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
          <User size={20} />
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}

      {open && (
        <div className="absolute right-0 top-14 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {/* Profile */}

          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700"
          >
            <User size={18} />
            <span>Profile</span>
          </button>

          {/* Products */}

          <button
            onClick={() => {
              navigate("/products");
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700"
          >
            <Package size={18} />
            <span>Products</span>
          </button>

          <div className="border-t border-gray-100" />

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};
