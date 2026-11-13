import UserModel from "../Model/user.js";
import sendEmail from "../Config/nodemailer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// ================= REGISTER =================
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;//frontedted se data lene ke liye
//   console.log(name, email, password);
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);//random password deta hai wo hacker hack na kar paye

        // 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // OTP expiry = 1 minute
        const otpExpiry = new Date(Date.now() + 60 * 1000);

        await UserModel.create({
            name,
            email,
            password: hash,
            otp,
            otpExpiry,
            isVerified: false
        });

        await sendEmail(
            email,
            "Your OTP",
            `Your OTP is ${otp}. It will expire in 1 minute.`
        );

        res.status(201).json({
            message: "User registered. OTP sent to your email"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
};


// ================= OTP VERIFY =================
const otpVerify = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "User already verified"
            });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                message: "OTP not found"
            });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        res.status(200).json({
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "OTP verification failed"
        });
    }
};


// ================= LOGIN =================



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email first"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // Cookie Settings
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};



// ================= FORGOT PASSWORD =================
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpExpiry = new Date(Date.now() + 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await user.save();

        await sendEmail(
            email,
            "Reset Password OTP",
            `Your password reset OTP is ${otp}. It will expire in 1 minute.`
        );

        res.status(200).json({
            message: "OTP sent to your email"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to send OTP"
        });
    }
};


// ================= RESET PASSWORD =================
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                message: "OTP not found"
            });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        const hash = await bcrypt.hash(newPassword, 10);

        user.password = hash;
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Password reset failed"
        });
    }
};
const logout = async (req, res) => {

    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};



export {
    register,
    otpVerify,
    login,
    forgotPassword,
    resetPassword,
    logout
};
