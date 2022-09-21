const knex = require("../db/connection")


// reads review based on reviewId
function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first()
}

// updates the review with an updatedReview param
function update(updatedReview) {
    return knex("reviews")
        // .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then((updatedRecords) => updatedRecords[0])
}

// reads critic based on critic_id
function getCritic(criticId) {
    return knex("critics")
        .select("*")
        .where({ critic_id: criticId })
        .first()
}

// deletes review based on reviewId
function destroy(reviewId) {
    return knex("reviews")
        .where({ review_id: reviewId })
        .del()
}


module.exports = {
    read, 
    update,
    getCritic,
    delete: destroy,
}