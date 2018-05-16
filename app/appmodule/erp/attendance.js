var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var attnd = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");

attnd.saveAttendance = function saveAttendance(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_attendance") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _ntfdata = data.rows[0].funsave_attendance;

        if (req.body.psngrtype == "student") {
            var _prntntf = {
                "flag": "parents_notification",
                "title": "Attendance : " + _ntfdata.ntftitle,
                "body": _ntfdata.ntfmsg,
                "prntids": _ntfdata.prntids
            }

            tripapi.sendNotification(_prntntf);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

attnd.getAttendance = function getAttendance(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_attendance") + "($1,$2::json);", ['attnd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}