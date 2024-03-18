const router = require("express").Router();

const {suggestController, searchController} = require("../controllers");

router.get("/", searchController);
router.get("/suggestions", suggestController);

module.exports = router;