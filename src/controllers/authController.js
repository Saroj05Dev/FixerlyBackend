const { loginUser } = require("../services/authService");
async function login(req, res) {
    const loginPayload = req.body;

    try {
        const user = await loginUser(loginPayload);

        // Store token in cookie (optional, for browsers)
        res.cookie("authToken", user.token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 // 1 hour
        });

        // 🔥 Return token in response so Thunder Client can use it
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {
                token: user.token,         // 👈 add this line
                userRole: user.role,
                userData: user.userData
            },
            error: {}
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || error.reason,
            error: error
        });
    }
}

async function logout(req, res) {
    res.cookie("authToken", "", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 0
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
        data: {},
        error: {}
    })
}

module.exports = {
    login,
    logout
}