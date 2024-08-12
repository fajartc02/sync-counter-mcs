const responseStatus = require("../functions/responseStatus");
const Counters = require("../models/counter");

module.exports = {
    getAllCounters: async(req, res) => {
        try {
            const counters = await Counters.getAll();
            responseStatus.common(res, counters);
        } catch (error) {
            console.log(error);
            responseStatus.serverError(res, error);
        }
    },
    getCounterByMcName: async(req, res) => {
        try {
            const counters = await Counters.getByMcName(req.params.machine_nm);
            responseStatus.common(res, counters);
        } catch (error) {
            console.log(error);
            responseStatus.serverError(res, error);
        }
    },
};