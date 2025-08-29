const OrderModel = require("../../models/order");
const ProductModel = require("../../models/product");
const CustomerModel = require("../../models/customer");
const transporter = require("../../../libs/transporter");
const ejs = require("ejs");
const pagination = require("../../../libs/pagination");
exports.index = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {};
    if (id) query.customerId = id;
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = page * limit - limit;
    const orders = await OrderModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      status: "success",
      data: {
        docs: orders,
        pages: await pagination(OrderModel, query, limit, page),
      },
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    return res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
exports.cancelled = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderModel.updateOne({ _id: id }, { $set: { status: "cancelled" } });
    return res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
exports.order = async (req, res) => {
  try {
    const { body } = req;
    const { customerId } = body;
    const { totalPrice } = body;
    const customer = await CustomerModel.findById(customerId);

    prdIds = body.items.map((item) => item.prd_id);
    const products = await ProductModel.find({
      _id: { $in: prdIds },
    });
    const newItems = body.items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.prd_id);
      return { ...item, name: product ? product.name : "unKnown Product" };
    });
    // const newBody = {
    //     ...body,
    //     items: newItems
    // }
    //insert db
    await new OrderModel(body).save();
    //send mail
    const html = await ejs.renderFile(`${__dirname}/../../views/mail.ejs`, {
      customer: customer,
      items: newItems,
      totalPrice: totalPrice,
    });

    await transporter.sendMail({
      from: '"Vietpro Store" <taothethoi46@gmail.com>',
      to: customer.email,
      subject: "xác nhận đơn hàng từ vietpro shop",
      html: html,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
