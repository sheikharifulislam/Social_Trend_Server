const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            trim: true,
            maxLength: 150,
            required: true,
        },
        bio: {
            type: String,
            trim: true,
            maxLength: 350,
            required: true,
        },
        profilePic: {
            type: String,
            default: 'http://localhost:5000/uploads/defaultUserProfile.jpg',
        },
        coverPic: String,
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
            },
        ],
        bookmarks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Profile = model('Profile', profileSchema);
module.exports = Profile;
