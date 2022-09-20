const reviewsService = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")



async function reviewExists(req, res, next){
    const review = await reviewsService.read(Number(req.params.reviewId))
    if (review) {
        res.locals.review = review
        return next()
    }
    next({
        status: 404, 
        message: `Review cannot be found for id: ${req.params.reviewId}`
    })
}

async function update(req, res, next) {
    const updatedReview = {
        ...req.body.data, 
        review_id: res.locals.review.review_id,
    }
    const data = await reviewsService.update(updatedReview)
    res.json({ data })
}




module.exports = {
    update: [
        reviewExists,
    ]
}