const express = require('express');
const app = express()
const cookieParser=require("cookie-parser");
const config = require("config");

app.use(cookieParser());
app.use(express.json())
app.use("/assets/uploads/images",
    express.static(config.get("app.baseImageUrl")))

app.use(
    config.get("app.prefixApiVersion"),
    require(`${__dirname}/../routers/web`),
)
module.exports = app;