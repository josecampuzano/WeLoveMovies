const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")
const cors = require("cors")

// enables cors for the entire router 
router.use(cors())


router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

router.route("/:movieId/theaters")
    .get(controller.showingInTheaters)
    .all(methodNotAllowed)

router.route("/:movieId/reviews")
    .get(controller.movieReviews)
    .all(methodNotAllowed)

module.exports = router;
