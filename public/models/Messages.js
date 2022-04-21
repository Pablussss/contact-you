const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    user: String,
    msg: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Message', MessageSchema);