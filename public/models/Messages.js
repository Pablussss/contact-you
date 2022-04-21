const mongoose = require('mongoose');
const { Schema } = mongoose;

new Schema({
    user: String,
    msg: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})