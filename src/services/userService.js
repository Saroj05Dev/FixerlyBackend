const { findUser, createUser } = require("../repositories/userRepository");
const { findOtp } = require("../repositories/otpRepository");

async function registerUser(userDetails) {
    const user = await findUser({ email: userDetails.email });
    const existingPhone = await findUser({ phone: userDetails.phone });

    if (user || existingPhone) {
        throw { reason: "User with this email or phone already exists", statusCode: 400 };
    }

    // ensure OTP was verified (no OTP doc should exist now)
    const otpStillExists = await findOtp(userDetails.phone);
    if (otpStillExists) {
        throw { reason: "Phone number not verified yet", statusCode: 400 };
    }

    const newUser = await createUser({
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        phone: userDetails.phone,
        role: userDetails.role,
        isVerified: true // set verified after OTP check
    });

    if (!newUser) throw { reason: "Something went wrong creating user", statusCode: 500 };

    return newUser;
}

module.exports = { registerUser };
