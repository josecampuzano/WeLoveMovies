const reviewsService = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


// awaits service read and verifies that the review exists; if it does, it stores it in res.locals.review
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

// awaits service update; requires an updatedReview parameter to call service update 
// after update call, critic information gets assigned from service getCritic 
async function update(req, res, next) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data, 
    }
    // console.log("updated review:", updatedReview)
    const newReview = await reviewsService.update(updatedReview)
    // console.log(newReview)
    const readNewReview = await reviewsService.read(updatedReview.review_id)
    readNewReview.critic = await reviewsService.getCritic(updatedReview.critic_id)
    // console.log(readNewReview)
    res.json({ data: readNewReview })
}

// awaits service destroy 
async function destroy(req, res, next) {
    const { review } = res.locals
    await reviewsService.delete(review.review_id)
    res.sendStatus(204)
}


module.exports = {
    update: [
        reviewExists,
        asyncErrorBoundary(update),
    ],
    delete: [
        reviewExists,
        asyncErrorBoundary(destroy),
    ]
}