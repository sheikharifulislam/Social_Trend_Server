const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 30,
        required: true,
    },
    email: {
        type: String,
        trim: true,
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
    gander: {
        type: String,
        required: true,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    }
}, {
    timestamps: true,
});

const User = model('User', userSchema);

module.exports = User;