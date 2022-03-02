const {Schema, model} = require('mongoose');


const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        trim: true,
        maxLength: 150,
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 350,
    },
    profilePic: String,
    links: {
        webSite: String,
        faceBook: String,
        twitter: String,
        github: String,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ]
}, {
    timestamps: true,
});

const Profile = model('Profile', profileSchema);
module.exports = Profile;