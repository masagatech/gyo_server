var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var attnd = module.exports = {};
var attendanceapi = require("../../reports/templates/attendance/attendance.js");

attnd.getAttendanceReports = function getAttendanceReports(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_attendance") + "($1,$2,$3::json);", ['attndrpt1', 'attndrpt2', req.query], function(data) {
        if (req.query.flag == "reports") {
            download(req, res, {
                attndhead: data.rows[0],
                psngrcolumn: data.rows[0][0].psngrcolumn,
                attndcolumn: data.rows[0][0].attndcolumn,
                attnddata: data.rows[1],
                params: req.query
            }, { 'all': 'attendance/studentattendance.html' }, attendanceapi.getAttendanceReports);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}