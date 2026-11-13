import { Register } from "../../Component/User/Register";
import { Login } from "../../Component/User/Login";
import { OtpVerify } from "../../Component/User/OtpVerify";
import { ResetPassword } from "../../Component/User/ResetPassword";
import { ForgotPassword } from "../../Component/User/ForgotPassword";
import { Home } from "../../Component/Home/Home";
import { About } from "../../Component/StaticPages/About";
import { Contact } from "../../Component/StaticPages/Contact";
import { Profile } from "../../Component/User/Profile";

const UserRoute = [
    {
        path:"/",
        element:<Home/>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/otpVerify",
        element: <OtpVerify />
    },
    {
        path: "/forgotPassword",
        element: <ForgotPassword />
    },
    {
        path: "/resetPassword",
        element: <ResetPassword />
    },
    {
        path:"/about",
        element:<About/>
    },
    {
        path:"/contact",
        element:<Contact/>
    },
    {
        path:"/profile",
        element:<Profile/>
    }
   
];

export default UserRoute;