const router = require("express").Router();

const {searchController} = require("../controllers");

router.get("/suggestions", searchController.suggest);
router.get("/", searchController.results);

module.exports = router;