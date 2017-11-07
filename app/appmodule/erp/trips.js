var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var trips = module.exports = {};

trips.starttrip = function(req, res, done) {
    req.body.mode = "start";

    db.callFunction("select " + globals.erpschema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].funsave_api_startstoptrip;
        rs.resp(res, 200, _d);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}

// api for stop trip from driver device

trips.stoptrip = function(req, res, done) {
    req.body.mode = "stop";

    db.callFunction("select " + globals.erpschema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].funsave_api_startstoptrip;
        rs.resp(res, 200, _d);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}

trips.getEmpStatus = function getEmpStatus(req, res, done) {
    db.callFunction("select " + globals.erpschema("funget_empstatus") + "($1::json);", [req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}