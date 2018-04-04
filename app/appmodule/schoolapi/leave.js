var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var lvpsngr = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");

// Applied Leave

lvpsngr.savePassengerLeave = function savePassengerLeave(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_leaveinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

// Approval Leave

lvpsngr.savePassengerLeaveApproval = function savePassengerLeaveApproval(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_leaveapproval") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _ntfdata = data.rows[0].funsave_leaveapproval;

        var _prntntf = {
            "flag": "notification",
            "title": "Leave : " + _ntfdata.title,
            "body": _ntfdata.msg,
            "psngrid": _ntfdata.ntfpsngrid
        }

        tripapi.sendNotification(_prntntf);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

// Leave Details

lvpsngr.getPassengerLeave = function getPassengerLeave(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_leavedetails") + "($1,$2::json);", ['lv', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Leave Export

lvpsngr.exportPassengerLeave = function exportPassengerLeave(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_leaveexport") + "($1,$2::json);", ['lvexp', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Leave Reports

lvpsngr.getLeaveReports = function getLeaveReports(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_leavedetails") + "($1,$2::json);", ['lvrpt', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}