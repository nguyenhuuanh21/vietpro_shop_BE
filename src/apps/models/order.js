const mongoose = require("../../common/init_mongodb")()
const OrderSchema = new mongoose.Schema(
    {
        totalPrice: {
            type: Number,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        items: [
            {
                prd_id: {
                    type: String,
                    required: true
                },
                qty: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {timestamps: true}
)
const OrderModel = mongoose.model("Orders", OrderSchema,"orders")
module.exports = OrderModel