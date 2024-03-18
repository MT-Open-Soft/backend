const router = require("express").Router();

const {searchController} = require("../controllers");

router.get("/suggestions", searchController.suggest);

module.exports = router;