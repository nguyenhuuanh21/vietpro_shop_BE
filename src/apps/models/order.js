const mongoose = require("../../common/init_mongodb")()
const OrderSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customers",
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,//shipping,delivered,cancelled 
            default: "shipping"
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