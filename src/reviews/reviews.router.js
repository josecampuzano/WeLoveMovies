const router = require("express").Router()
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
// const cors = require("cors")


// enabled cors for the entire router
// router.use(cors())

router.route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)









module.exports = router