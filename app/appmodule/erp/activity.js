var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var activity = module.exports = {};

activity.saveActivityInfo = function saveActivityInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_activityinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

activity.getActivityDetails = function getActivityDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_activitydetails") + "($1,$2::json);", ['actv', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}