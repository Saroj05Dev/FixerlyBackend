const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provider name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+com$/.test(v);
            },
            message: props => `${props.value} is not a valid email. It must end with .com`
        }
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number. It must be exactly 10 digits`
        }
    },
    password_hash: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },
    bio: {
        type: String,
        trim: true,
        default: null
    },
    experience: {
        type: Number,
        min: [0, "Experience cannot be negative"],
        default: null
    },
    verified: {
        type: Boolean,
        default: false
    },
    average_rating: {
        type: Number,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: [true, "Service ID is required"]
    },
    sub_service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubService",
        default: null
    }
});

module.exports = mongoose.model("Provider", providerSchema);
