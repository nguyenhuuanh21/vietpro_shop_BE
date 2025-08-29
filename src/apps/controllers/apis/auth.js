const CustomerModel = require("../../models/customer");
const jwt = require("jsonwebtoken");
const config = require("config");
const generateAccessToken = async (customer) => {
  return jwt.sign(
    // 1.data,
    // 2.secret key,
    // 3.expire in
    { email: customer.email },
    config.get("app.jwtAccessKey"),
    { expiresIn: "25s" }
  );
};
const generateRefreshToken = async (customer) => {
  return jwt.sign(
    // 1.data,
    // 2.secret key,
    // 3.expire in
    { email: customer.email },
    config.get("app.jwtRefreshKey"),
    { expiresIn: "1d" }
  );
};
exports.registerCustomer = async (req, res) => {
  try {
    const { body } = req;
    const { email, phone } = body;
    const isEmail = await CustomerModel.findOne({ email: email });
    if (isEmail)
      return res
        .status(400)
        .json({ status: "fail", message: "email already exists" });
    const isPhone = await CustomerModel.findOne({ phone: phone });
    if (isPhone)
      return res
        .status(400)
        .json({ status: "fail", message: "phone already exists" });
    const customer = {
      email: email,
      phone: phone,
      fullName: body.fullName,
      password: body.password,
      address: body.address,
    };
    await CustomerModel(customer).save();
    return res.status(200).json({
      status: "success",
      message: "register successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmail = await CustomerModel.findOne({ email: email });
    if (!isEmail) return res.status(400).json("email not valid");
    const isPassword = password === isEmail.password;
    if (!isPassword) return res.status(400).json("password not valid");
    if (isEmail && isPassword) {
      //generate token jsonwebtoken
      const accessToken = await generateAccessToken(isEmail);
      const refreshToken = await generateRefreshToken(isEmail);
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      const { password, ...others } = isEmail._doc;
      return res.status(200).json({
        customer: others,
        accessToken,
      });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return resizeBy.status(401).json("authentication required");
    jwt.verify(
      refreshToken,
      config.get("app.jwtRefreshKey"),
      async (error, decoded) => {
        if (error) return res.status(401).json("authentication required");
        const newAccessToken = await generateAccessToken(decoded);
        return res.status(200).json({
          accessToken: newAccessToken,
        });
      }
    );
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
exports.logoutCustomer = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
