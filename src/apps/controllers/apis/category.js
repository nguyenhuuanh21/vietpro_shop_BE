const pagination = require("../../../libs/pagination")
const CategoryModel = require("../../models/category")
const ProductModel = require("../../models/product")
exports.index =async (req, res) => {
    try {
        const categories = await CategoryModel.find()
        return res.status(200).json({
            status: "success",
            data: {
                docs:categories
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.show =async (req, res) => {
    try {
        const { id } = req.params
        const category = await CategoryModel.findById(id)
        return res.status(200).json({
            status: "success",
            data: category
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.categoryProducts = async (req, res) => {
    try {
        const { id } = req.params 
        const query = {}
        query.category_id = id
        const page = Number(req.query.page) || 1
        const limit = 10
        const skip = page * limit - limit
        const products = await ProductModel
            .find(query)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
        return res.status(200).json({
            status: "success",
            filter: {
                page,
                limit,
                category_id: id
            },
            data: {
                docs: products,
                pages: await pagination(ProductModel, query, limit, page)
            }
        })
    } catch(error) {
        return res.status(500).json(error)
    }
}