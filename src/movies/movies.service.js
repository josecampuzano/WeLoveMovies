const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(isShowing) {
    if (isShowing === "true") {
        return listOnlyShowing();
    }
    return listAll();
}

function listAll() {
    return knex("movies")
        .select("*")
}

function listOnlyShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
        .groupBy("m.movie_id")
        .where({ "mt.is_showing": true })
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ "movie_id": movieId })
        .first()

}

function showingInTheaters(movieId) {
    return knex("movies_theaters as mt")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*", "mt.is_showing", "mt.movie_id")
        .where({ "mt.movie_id": movieId})
}

function movieReviews(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({ "r.movie_id": movieId })
}

module.exports = {
    list,
    read,
    showingInTheaters,
    movieReviews,
}