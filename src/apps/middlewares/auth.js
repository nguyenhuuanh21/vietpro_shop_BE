const jwt = require('jsonwebtoken')
const config=require("config")
exports.verifyAuthenticationCustomer = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        //Bearer <token>
        if (authorization) {
            const accessToken = authorization.split(" ")[1]
            jwt.verify(
                //1.access token
                //2.secret key
                //3.
                accessToken,
                config.get('app.jwtAccessKey'),
                (error, decoded) => {
                    if (error) {
                        return res.status(401).json("invalid token")
                    }
                    next()
                }
            )
        } else {
            return res.status(401).json("authentication required")
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}