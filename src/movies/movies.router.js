const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")
const cors = require("cors")




router.route("/")
    .get(cors(), controller.list)
    .all(methodNotAllowed)

router.route("/:movieId")
    .get(cors(), controller.read)
    .all(methodNotAllowed)

router.route("/:movieId/theaters")
    .get(cors(), controller.showingInTheaters)
    .all(methodNotAllowed)

module.exports = router;
