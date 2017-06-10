var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var stops = module.exports = {};

stops.saveRoutesInfo = function saveRoutesInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_routesinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

stops.saveStopsInfo = function saveStopsInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_stopsinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

stops.getStopsDetails = function getStopsDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_stopsdetails") + "($1,$2::json);", ['stp', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}