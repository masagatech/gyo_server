var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var fees = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");

fees.saveClassFees = function saveClassInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_classfees") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

fees.getClassFees = function getClassFees(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_classfees") + "($1,$2,$3::json);", ['cf1', 'cf2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

fees.saveFeesCollection = function saveFeesCollection(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_feescollection") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _ntfdata = data.rows[0].funsave_feescollection;

        var _prntntf = {
            "flag": "parents_notification",
            "title": "Fees : " + _ntfdata.ntftitle,
            "body": _ntfdata.ntfmsg,
            "prntids": _ntfdata.prntids
        }

        tripapi.sendNotification(_prntntf);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

fees.getFeesCollection = function getFeesCollection(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_feescollection") + "($1,$2::json);", ['fcl', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}