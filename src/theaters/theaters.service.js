const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")

// returns information from theaters, movies_theaters, and movies tables
// configures reduceMovies to format the data in the .then
// calls the function reduceMovies to return the data in correct format
function list(){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("*")
    .then((data) => {
        // console.log("THIS IS THE RESPONSE LOG", response)


    const reduceMovies = reduceProperties("theater_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        rating: ["movies", null, "rating"],
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        created_at: ["movies", null, "created_at"],
        updated_at: ["movies", null, "updated_at"],
        is_showing: ["movies", null, "is_showing"],
        theater_id: ["movies", null, "theater_id"],
    }) 

    return reduceMovies(data)

    // console.log("THIS IS THE REDUCED VERSION", JSON.stringify(reduceMovies(data), null, 4))
    })
}

module.exports = {
    list
}