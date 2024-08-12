var express = require("express");
var router = express.Router();

router.use("/counter", require("./counter"));

module.exports = router;