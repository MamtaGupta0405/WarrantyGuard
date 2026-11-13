import jwt from "jsonwebtoken";

const isAuthorized = (req, res, next) => {

    try {

        // Cookie se token lena
        const token = req.cookies.token;

        // Token nahi hai
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // JWT verify
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // JWT se user information
        req.id = decoded.userId;
        req.email = decoded.email;

        // Next controller
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
};

export default isAuthorized;