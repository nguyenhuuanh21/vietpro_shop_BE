const express = require('express');
const app = express()

app.use(require(`${__dirname}/../routers/web`))

module.exports = app;