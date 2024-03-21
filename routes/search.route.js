const router = require("express").Router();

const {searchController} = require("../controllers");

router.get("/suggestions", searchController.suggest);
router.get("/", searchController.search);

module.exports = router;