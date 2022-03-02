const {Schema, model} = require('mongoose');
// const User = require('./UserModel');
// const Post = require('./PostModel');

const commentSchema = new Schema({
    post: {
        type: Schema.Type.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: Schema.Type.ObjectId,
        ref: 'User',
        required: true,
    },
    body: {
        type: String,
        trim: true,
        required: true,
    },
    replies: [
        {
            body: {
                type: String,
                required: true,
            },
            user: {
                type: Schema.Type.ObjectId,
                ref: 'User',
                required: true,
            },
            createAt: {
                type: Date,
                default: new Date(),
            }
        }
    ]
}, {
    timestamps: true,
})

const Comment = model('Comment', commentSchema);
module.exports = Comment;