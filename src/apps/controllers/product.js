const ProductModel = require("../models/product")
const CategoryModel = require("../models/category")
const pagination=require("../../libs/pagination")
exports.index = async (req, res) => {
    try {
        const query = {}
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = page * limit - limit
        if (req.query.is_featured) query.is_featured = req.query.is_featured
        if(req.query.is_stock) query.is_stock= req.query.is_stock
        const products = await ProductModel
            .find(query)
            .populate('category_id')
            .sort({ _id: -1 })
            .limit(limit)
            .skip(skip)
        res.status(200).json({
            status: "success",
            filters: {
                is_featured: req.query.is_featured || null,
                is_stock: req.query.is_stock || null
            },
            data: {
                docs: products,
                pages: await pagination(ProductModel, query, limit, page)
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}