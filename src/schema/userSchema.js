// src/schema/User_schema.js
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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, "Password must be provided"],
        trim: true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Weak password"]
    },
    phone: {
        type: String,
        required: [true, "Phone number must be provided"],
        unique: true,
        minLength: [10, "10 digits only"],
        maxLength: [10, "10 digits only"]
    },
    role: {
        type: String,
        enum: ["user", "provider", "admin"],
        default: "user"
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    kycStatus: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: null 
    },
    rates: Number,
    workArea: String,
    experienceYears: Number,
    availability: { 
        type: String, 
        enum: ['online', 'offline'], 
        default: 'offline' 
    },
    kycDocs: [String]
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

module.exports = mongoose.model("User", userSchema);