
import React, { useState } from "react";
import { ShieldCheck, Home, Info, Mail, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "./Auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");

  // Active page check
  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-md px-6 lg:px-10">

        {/* LEFT - Logo */}
        <div className="navbar-start">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div className="bg-emerald-600 text-white p-2.5 rounded-xl">
              <ShieldCheck size={25} />
            </div>

            <div className="text-left">
              <h1 className="text-xl font-bold text-[#172b27]">
                WarrantyGuard
              </h1>

              <p className="text-xs text-gray-400">
                Smart Warranty Management
              </p>
            </div>
          </button>
        </div>

        {/* CENTER - Search + Menu */}
        <div className="navbar-center hidden lg:flex items-center gap-3">

          {/* Search */}
          <form onSubmit={handleSearch}>
            <div className="join">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered join-item w-48"
              />

              <button
                type="submit"
                className="btn join-item bg-emerald-600 hover:bg-emerald-700 text-white border-none"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className={`btn gap-2 ${
              isActive("/")
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "btn-ghost"
            }`}
          >
            <Home size={18} />
            Home
          </button>

          {/* About */}
          <button
            onClick={() => navigate("/about")}
            className={`btn gap-2 ${
              isActive("/about")
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "btn-ghost"
            }`}
          >
            <Info size={18} />
            About
          </button>

          {/* Contact */}
          <button
            onClick={() => navigate("/contact")}
            className={`btn gap-2 ${
              isActive("/contact")
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "btn-ghost"
            }`}
          >
            <Mail size={18} />
            Contact
          </button>

        </div>

        {/* RIGHT - Auth */}
        <div className="navbar-end">
          <Auth />
        </div>

      </div>
    </>
  );
};
