const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: [true, "Customer name is required"],
        trim: true,
        minlength: [3, "Customer name must be at least 3 characters"]
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
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Customer", customerSchema);
