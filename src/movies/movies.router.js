const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")
const cors = require("cors")




router.route("/")
    .get(cors(), controller.list)
    .all(methodNotAllowed)



module.exports = router;
