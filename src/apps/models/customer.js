const mongoose = require("../../common/init_mongodb")()
const CustomerSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required:true
        },
        email: {
            type: String,
            required:true
        },
        password: {
            type: String,
            required:true
        },
        phone: {
            type: String,
            required:true
        },
        address: {
            type: String,
            required:true
        },
    },
    {timestamps:true}
)

const CustomerModel = mongoose.model("Customers", CustomerSchema, "customers")
module.exports = CustomerModel