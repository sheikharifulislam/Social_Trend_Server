const {Schema, model} = require('mongoose');

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expire: {
        type: Date,
        default: Date.now(),
        required: true, 
    }
});

const TokenModle = model('Token', tokenSchema);
module.exports = TokenModle;