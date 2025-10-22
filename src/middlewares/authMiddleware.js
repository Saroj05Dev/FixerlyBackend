// Middleware to check if user is authenticated
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies?.authToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                data: {},
                message: "User is not authenticated",
                error: "No auth token provided"
            })
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                data: {},
                message: "User is not authenticated",
                error: "Invalid auth token provided"
            })
        }

        req.user = {
            id: decoded.id,
            phone: decoded.phone,
            email: decoded.email,
            role: decoded.role
        };
        next();
    } catch (error) {
        console.log("Error in isAuthenticated middleware:", error);

        // Check for common JWT errors like token expiry or invalid signature
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
             return res.status(401).json({
                success: false,
                data: {},
                message: "Authentication failed",
                error: error.message
            });
        }

        return res.status(500).json({
            success: false,
            data: {},
            message: "Authentication failed due to a server error",
            error: error.message || "Internal server error"
        })
    }
}

function isAuthorized(roles) {
    const requiredRoles = Array.isArray(roles) ? roles : [roles]; 

    return function (req, res, next) {
        // Check if the user's role is included in the list of required roles
        if (!requiredRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                data: {},
                message: "User is not authorized",
                error: "You are not authorized to access this resource"
            })
        }
        next();
    }
}

module.exports = {
    isAuthenticated,
    isAuthorized
}