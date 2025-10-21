const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Admin name is required"],
        trim: true,
        minlength: [3, "Admin name must be at least 3 characters"]
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

module.exports = mongoose.model("Admin", adminSchema);
