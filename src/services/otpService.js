const axios = require("axios");
const bcrypt = require("bcrypt");
const { saveOtp, findOtp, deleteOtp } = require("../repositories/otpRepository");
const { USE_FAST2SMS, FAST2SMS_API_KEY } = require("../config/serverConfig");

async function sendOtp(phone) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 min

    await saveOtp(phone, hashedOtp, expiresAt);

    // Switch between real and mock mode
    const useFast2Sms = USE_FAST2SMS === "true";

    if (!useFast2Sms) {
        console.log(`[MOCK OTP] ${phone}: ${otp}`);
        return { message: "OTP logged to console (mock mode)" };
    }

    try {
        await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                route: "v3",
                sender_id: "TXTIND",
                message: `Your Fixerly OTP is ${otp}. Valid for 2 minutes.`,
                language: "english",
                flash: 0,
                numbers: phone
            },
            { headers: { authorization: FAST2SMS_API_KEY } }
        );
        console.log(`[DEV ONLY] OTP sent to ${phone}: ${otp}`);
        return { message: "OTP sent via Fast2SMS" };
    } catch (error) {
        console.error("Fast2SMS error:", error.response?.data || error.message);
        throw { reason: "Failed to send OTP", statusCode: 500 };
    }
}

async function verifyOtp(phone, enteredOtp) {
    const otpDoc = await findOtp(phone);
    if (!otpDoc) throw { reason: "OTP not found or expired", statusCode: 400 };

    const valid = await bcrypt.compare(enteredOtp, otpDoc.otp);
    if (!valid) throw { reason: "Invalid OTP", statusCode: 400 };

    if (otpDoc.expiresAt < new Date()) {
        await deleteOtp(phone);
        throw { reason: "OTP expired", statusCode: 400 };
    }

    await deleteOtp(phone); // remove after verification
    return true;
}

module.exports = { sendOtp, verifyOtp };
