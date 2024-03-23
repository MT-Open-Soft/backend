const router = require("express").Router();
const cors = require("cors");

const {subscribeController} = require("../controllers");
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors());


router.patch("/updateid", subscribeController.subscription);
router.get("/payment/:id", subscribeController.payment);
router.post ("/createorder",subscribeController.createorder);
//router.post ("/verification",subscribeController.verifyorder);

module.exports = router;