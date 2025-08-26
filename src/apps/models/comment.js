const mongoose = require("../../common/init_mongodb")()
const CommentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        product_id: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)
const CommentModel = mongoose.model("Comments", CommentSchema,"comments")
module.exports = CommentModel