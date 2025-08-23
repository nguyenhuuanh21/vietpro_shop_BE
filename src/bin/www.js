const config=require("config")
const app = require("../apps/app")
const server = app.listen(port=config.get('app.port'), () => {
    console.log(`Server is running on port ${port}`)
})