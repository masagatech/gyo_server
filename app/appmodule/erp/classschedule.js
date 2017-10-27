var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var classschedule = module.exports = {};

classschedule.saveClassSchedule = function saveClassSchedule(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_classschedule") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

classschedule.getClassSchedule = function getClassSchedule(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_classschedule") + "($1,$2::json);", ['clssch', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

classschedule.saveTimeTable = function saveTimeTable(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_timetable") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

classschedule.getTimeTable = function getTimeTable(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_timetable") + "($1,$2::json);", ['tmt', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}