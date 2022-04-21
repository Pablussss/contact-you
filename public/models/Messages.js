const mongoose = require('mongoose');
const { Schema } = mongoose;

new MessageSchema({
    user: String,
    msg: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Message', MessageSchema);