const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const data = await moviesService.list(req.query.is_showing);
    res.json({ data })
}

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId)

    if (movie) {
        res.locals.movie = movie
        return next()
    }
    next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res, next) {
    res.json({ data: res.locals.movie })
}

async function showingInTheaters(req, res, next) {
    const data = await moviesService.showingInTheaters(req.params.movieId)
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [movieExists,read],
    showingInTheaters: [movieExists, asyncErrorBoundary(showingInTheaters)]
};