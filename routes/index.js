const searchRouter = require("./search.route");
const subscribeRouter= require("./subscribe.route");


const router = require("express").Router();

router.use("/search", searchRouter);
router.use("/subscribe", subscribeRouter);

module.exports = router;