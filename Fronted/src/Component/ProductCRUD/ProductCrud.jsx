
import React from "react";
import { Product } from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    ShieldCheck,
    Plus,
    ArrowLeft
} from "lucide-react";

import { CreateProduct } from "./CreateProduct";
import { DeleteProduct } from "./DeleteProduct";
import { UpdateProduct } from "./UpdateProduct";

import {
    OpenCreatePopUp
} from "../../Store/Product/productSlice";

export const ProductCrud = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        isCreatePopUp,
        isDeletePopUp,
        isEditPopUp
    } = useSelector((state) => state.productReducer);

    return (
        <div className="min-h-screen bg-base-200">

            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-md px-4 md:px-8">

                {/* Left Arrow */}
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-circle btn-ghost mr-3"
                    title="Go Back"
                >
                    <ArrowLeft size={24} />
                </button>

                {/* Logo */}
                <div className="flex-1">
                    <a href="/" className="flex items-center gap-2">
                        <div className="bg-primary text-primary-content p-2 rounded-xl">
                            <ShieldCheck size={25} />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold">
                                WarrantyGuard
                            </h1>
                            <p className="text-xs opacity-60">
                                Manage your warranties
                            </p>
                        </div>
                    </a>
                </div>

                {/* Add Product Button */}
                <div>
                    <button
                        onClick={() => dispatch(OpenCreatePopUp())}
                        className="btn btn-primary gap-2"
                    >
                        <Plus size={20} />

                        <span className="hidden sm:inline">
                            Add Product
                        </span>
                    </button>
                </div>
            </div>

            {/* Page Content */}
            <main className="p-4 md:p-8">

                <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                        My Products
                    </h2>

                    <p className="text-base-content/60 mt-1">
                        Manage your products and track warranty expiry dates.
                    </p>
                </div>

                {/* Product List */}
                <Product />

            </main>

            {/* Popups */}
            {isCreatePopUp && <CreateProduct />}
            {isEditPopUp && <UpdateProduct />}
            {isDeletePopUp && <DeleteProduct />}

        </div>
    );
};

export default ProductCrud;
