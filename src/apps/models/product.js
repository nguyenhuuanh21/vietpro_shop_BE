const mongoose = require("../../common/init_mongodb")()
const ProductSchema = new mongoose.Schema(
    {
        category_id: {
            type:  mongoose.Types.ObjectId,
            ref: "Categories",
            required: true
        },
        name: {
            type: String,
            text:true,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        price:{
            type: String,
            required:true
        },
        status: {
            type: String,
            required: true
        },
        accessories: {
            type: String,
            required: true
        },
        promotion: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        is_stock: {
            type: Boolean,
            required: true
        },
        is_featured: {
            type: Boolean,
            required: false
        }
    },
    { timestamps: true }
)
const ProductModel = mongoose.model("Products", ProductSchema,"products")
module.exports = ProductModel