//comment schemas

const mongoose = require("mongoose")

const commentsSchema = mongoose.Schema({
    userid: {
        type: String,
    },
    postid: {
        type: Number,
    },
    comments: {
        type: String,
    },
    nestedcomments: [{
        userid: {
            type: String,
            required: true
        },
        realuser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",

        },
        comments: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        comment_id: {
            type: String,
            required: true
        },
    }]
}, { timestamps: true })

module.exports = mongoose.model("comments", commentsSchema)