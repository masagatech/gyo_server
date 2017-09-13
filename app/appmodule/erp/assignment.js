var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var assignment = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");

assignment.saveAssignmentInfo = function saveAssignmentInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_assignmentinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _dtr = {
            "flag": "parents_notification",
            "title": req.body.title,
            "body": req.body.msg,
            "parentsid": data.rows[0].funsave_assignmentinfo.parentsid
        }

        console.log(_dtr);

        tripapi.sendNotification(_dtr);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

assignment.getAssignmentDetails = function getAssignmentDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_assignmentdetails") + "($1,$2::json);", ['assnm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}