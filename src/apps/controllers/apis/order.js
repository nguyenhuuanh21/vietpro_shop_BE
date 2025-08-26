const OrderModel = require("../../models/order")
const ProductModel=require("../../models/product")
const transporter=require('../../../libs/transporter')
const config = require("config")
const ejs=require('ejs')
exports.order = async (req, res) => {
    try {
        const { body } = req
        prdIds = body.items.map((item) => item.prd_id)
        const products = await ProductModel.find({
            _id: { $in: prdIds }
        })
        const newItems = body.items.map((item) => {
            const product = products.find((p) => p._id.toString() === item.prd_id)
            return { ...item, name: product ? product.name : "unKnown Product" }
        })
        const newBody = {
            ...body,
            items: newItems
        }
        //insert db
        await new OrderModel(body).save()
        //send mail

        const html=await ejs.renderFile(`${__dirname}/../../views/mail.ejs`,{newBody:newBody})

        await transporter.sendMail({
            from: '"Vietpro Store" <taothethoi46@gmail.com>',
            to: body.email,
            subject: "xác nhận đơn hàng từ vietpro shop",
            html: html
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}   