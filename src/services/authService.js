const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/serverConfig");
const { findUser } = require("../repositories/userRepository");

async function loginUser(authDetails) {
    const phone = authDetails.phone;
    const password = authDetails.password;

    // 1. Check if there's a register user with the phone number
    const user = await findUser({ phone });
    if (!user) throw { reason: "User not found", statusCode: 400 };

    // 2. If the user is found check if the password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw { reason: "Invalid password", statusCode: 400 };

    const userRole = user.role ? user.role : "user";

    // 3. If the password is valid, create a token and return it
    const token = jwt.sign({ phone: user.phone, id: user._id, role: userRole }, JWT_SECRET, { expiresIn: "1h" });
    return { token, role: userRole, userData: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
    } }
}

module.exports = { loginUser };