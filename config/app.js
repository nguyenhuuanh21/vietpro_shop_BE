module.exports = {
    port: process.env.SERVER_PORT||8000,
    prefixApiVersion: process.env.PREFIX_API_VERSION || "/api/v1",
    baseImageUrl:process.env.BASE_IMAGE_URL || `${__dirname}/../src/public/uploads/images`
}