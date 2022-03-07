const {Schema, model} = require('mongoose');


const userSchema = new Schema({
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
    gander: {
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
        enum: ['user','admin'],
        default: 'user',       
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