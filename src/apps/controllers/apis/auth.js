const CustomerModel = require("../../models/customer");
const jwt = require("jsonwebtoken");
const config = require("config");
exports.registerCustomer = async (req, res) => {};
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmail = await CustomerModel.findOne({ email: email });
    if (!isEmail) return res.status(400).json("email not valid");
    const isPassword = password === isEmail.password;
    if (!isPassword) return res.status(400).json("password not valid");
    if (isEmail && isPassword) {
      //generate token jsonwebtoken
      const accessToken = jwt.sign(
        // 1.data,
        // 2.secret key,
        // 3.expire in
        { email },
        config.get("app.jwtAccessKey"),
        { expiresIn: "1h" }
      );
      const { password, ...others } = isEmail._doc;
      return res.status(200).json({
        customer: others,
        accessToken,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.logoutCustomer = async (req, res) => {};
