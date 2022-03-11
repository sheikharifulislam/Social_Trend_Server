const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            trim: true,
            maxLength: 30,
            minlength: 3,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            minlength: 8,
            required: true,
        },
        birthday: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            enum: [true, false],
            default: false,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
        profilePic: {
            type: String,
            default: 'http://localhost:5000/uploads/defaultUserProfile.jpg',
        },
    },
    {
        timestamps: true,
    }
);

const User = model('User', userSchema);

module.exports = User;
