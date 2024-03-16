const router = require("express").Router();

const searchController = require("../controllers/search.controller");

router.get("/search", searchController);

module.exports = router;