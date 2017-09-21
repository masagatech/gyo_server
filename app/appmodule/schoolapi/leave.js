var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var lvpsngr = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");

lvpsngr.savePassengerLeave = function savePassengerLeave(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_leaveinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

lvpsngr.getPassengerLeave = function getPassengerLeave(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_leavedetails") + "($1,$2::json);", ['lp', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

lvpsngr.savePassengerLeaveApproval = function savePassengerLeaveApproval(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_leaveapproval") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _dtr = {
            "flag": "notification",
            "title": data.rows[0].funsave_leaveapproval.title,
            "body": data.rows[0].funsave_leaveapproval.msg,
            "psngrid": data.rows[0].funsave_leaveapproval.ntfpsngrid
        }

        tripapi.sendNotification(_dtr);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}