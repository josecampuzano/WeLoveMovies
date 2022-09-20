const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const data = await moviesService.list();
    res.json({ data })
}



module.exports = {
    list: asyncErrorBoundary(list),
};