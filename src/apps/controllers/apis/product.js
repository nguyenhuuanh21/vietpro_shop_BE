const ProductModel = require("../../models/product")
const CategoryModel = require("../../models/category")
const pagination = require("../../../libs/pagination")
const CommentModel = require("../../models/comment")
exports.index = async (req, res) => {
    try {
        const query = {}
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = page * limit - limit
        if (req.query.is_featured) query.is_featured = req.query.is_featured
        if (req.query.is_stock) query.is_stock = req.query.is_stock
        if(req.query.name) query.$text={$search:req.query.name}
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
                is_stock: req.query.is_stock || null,
                name: req.query.name || null
            },
            data: {
                docs: products,
                pages: await pagination(ProductModel, query, limit, page)
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.show =async (req,res) => {
    try {
        const { id } = req.params
        const product = await ProductModel.findById(id)
        return res.status(200).json({
            status: "success",
            data: product
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}
exports.comments = async (req,res) => {
    try {
        const { id } = req.params
        const query = {}
        query.product_id=id
        const limit = 10
        const page = Number(req.query.page) || 1
        const skip = page * limit - limit
        const comments = await CommentModel
            .find(query)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
        return res.status(200).json({
            status: "success",
            filters: {
                page,
                limit,
                product_id:id
            },
            data: {
                docs: comments,
                pages: await pagination(CommentModel, query, limit, page)
            }
        })
    } catch {
        return res.status(500).json(error)
    }
}
exports.storeComments = async (req, res) => {
    try {
        const { id } = req.params
        const comment = req.body 
        comment.product_id = id
        await new CommentModel(comment).save()
        return res.status(200).json({
            status: "success",
            data: comment
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}