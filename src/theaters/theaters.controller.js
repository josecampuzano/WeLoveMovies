const theatersService = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res, next) {
    const response = await theatersService.list()

    res.json({ data: response })


}

module.exports = {
    list: asyncErrorBoundary(list)
}

