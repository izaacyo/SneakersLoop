const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name!"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Please enter your email!"],
            trim: true, unique: true
        },

        password: {
            type: String,
            required: [true, "Please enter your password!"]
        },

        role: {
            type: Number,
            default: 0 // 0 = user , 1 = admin 
        },

        avatar: {
            type: String,
            default: "https://res.cloudinary.com/dn6ulsxxf/image/upload/v1635164479/user-member-avatar-face-profile-icon-vector-22965342-300x300_ebjhax.jpg"
        },

        cart: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);