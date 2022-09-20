const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(isShowing) {
    if (isShowing === "true") {
        return listOnlyShowing();
    }
    return listAll();
}

function listAll() {
    return knex("movies").select("*")
}

function listOnlyShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
        .groupBy("m.movie_id")
        .where({ "mt.is_showing": true })
}



module.exports = {
    list,
    
}