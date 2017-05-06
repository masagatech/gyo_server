var db = require("../../db/dbservice.js");
var rs = require("../util/resp.js");
var globals = require("../../globals.js");

var pidr = module.exports = {};

pidr.getAttendanceReports = function getAttendanceReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_rpt_attendance") + "($1,$2::json);", ['att', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}