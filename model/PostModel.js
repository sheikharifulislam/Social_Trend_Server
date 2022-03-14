const { Schema, model } = require('mongoose');
// const Comment = require('./CommentModel');

const postSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
        },
        auther: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        thumbnail: [String],
        readTime: String,
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Post = model('Post', postSchema);
module.exports = Post;
