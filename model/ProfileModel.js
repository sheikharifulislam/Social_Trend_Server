const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        bio: {
            type: String,
            trim: true,
            maxLength: 350,
        },
        workplace: {
            company: {
                type: String,
                trim: true,
            },
            position: {
                type: String,
                trim: true,
            },
        },
        education: {
            highSchool: {
                type: String,
                trim: true,
            },
            university: {
                type: String,
                trim: true,
            },
        },
        living: {
            current: {
                type: String,
                trim: true,
            },
            permanent: {
                type: String,
                trim: true,
            },
        },
        basicInfo: {
            aboutYourSelf: {
                type: String,
                trim: true,
            },
            gender: {
                type: String,
                trim: true,
            },
            relationshipStatus: {
                type: String,
                trim: true,
            },
        },
        contact: {
            mobile: {
                type: String,
                trim: true,
            },
            email: {
                type: String,
                trim: true,
            },
            website: {
                type: String,
                trim: true,
            },
        },
        profilePic: {
            fileId: String,
            fileUrl: {
                type: String,
                default: 'assets/defaultUserProfile.jpg',
            },
        },
        coverPic: {
            fileId: String,
            fileUrl: {
                type: String,
            },
        },
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
        friedns: [],
        friendsList: [],
    },
    {
        timestamps: true,
    }
);

const Profile = model('Profile', profileSchema);
module.exports = Profile;
