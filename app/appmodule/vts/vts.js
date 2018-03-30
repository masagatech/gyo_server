var mondb = require("../../db/mongodbservice.js");
var rs = require("gen").res;
var globals = require("gen").globals;
var datetime = require('node-datetime');

var tripapi = require("../schoolapi/tripapi.js");
var vts = module.exports = {};

vts.getFence = function(req, res, done) {
    var params = {
        "flag": req.query.almtyp,
        "enttid": req.query.enttid,
        "batchid": req.query.batchid,
        "drvid": req.query.drvid,
        "vehid": req.query.vehid,
        "rtid": req.query.rtid,
        "stpid": req.query.stpid
    };

    rs.resp(res, 200, []);

    tripapi.sendNotification(params);
}