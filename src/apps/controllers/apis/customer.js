const CustomerModel=require('../../models/customer')
exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        const isPhone = await CustomerModel.findOne({ phone: body.phone })
        if (isPhone && isPhone._id.toString() !== id) return res.status(400).json("phone existed")
        const customer = {
            fullName: body.fullName,
            address: body.address,
            phone: body.phone
        }
        await CustomerModel.updateOne({ _id: id }, customer)
        return res.status(200).json("update success")
    } catch (error) { 
        res.status(500).json(error.message)
    }
}