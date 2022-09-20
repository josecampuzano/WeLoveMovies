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

async function movieReviews(req, res, next) {
    const response = await moviesService.movieReviews(req.params.movieId)
    const data = response.map((item) => {
        return {
            "review_id": item.review_id, 
            "content": item.content, 
            "score": item.score,
            "created_at": item.created_at,
            "updated_at": item.updated_at,
            "critic_id": item.critic_id,
            "movie_id": item.movie_id,
            "critic": {
              "critic_id": item.critic_id, 
              "preferred_name": item.preferred_name,
              "surname": item.surname,
              "organization_name": item.organization_name,
              "created_at": item.created_at,
              "updated_at": item.updated_at
        }}
    })

    // console.log(data)
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [movieExists,read],
    showingInTheaters: [movieExists, asyncErrorBoundary(showingInTheaters)],
    movieReviews: [movieExists, asyncErrorBoundary(movieReviews)]
};