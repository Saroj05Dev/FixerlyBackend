const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be provided"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        required: [true, "Password must be provided"],
        trim: true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."]
    },

    phone: {
        type: String,
        required: [true, "Phone number must be provided"],
        unique: true,
        minLength: [10, "Phone number must only contain 10 digits"],
        maxLength: [10, "Phone number must only contain 10 digits"]
    },

    role: {
        type: String,
        enum: ["user", "provider", "admin"],
        default: "user"
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function () {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);

module.exports = User;