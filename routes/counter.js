var express = require("express");
const {
    getAllCounters,
    getCounterByMcName,
} = require("../controllers/counter.controllers");
var router = express.Router();

router.get("/", getAllCounters);
router.get("/:machine_nm", getCounterByMcName);

module.exports = router;