const { registerUser } = require("../services/userService");

async function createUser(req, res) {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json({
            message: "Successfully registered the user",
            success: true,
            data: user,
            error: {}
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: "Couldn't create the user",
            success: false,
            data: {},
            error: error.message
        })
    }
}

module.exports = {
    createUser
}