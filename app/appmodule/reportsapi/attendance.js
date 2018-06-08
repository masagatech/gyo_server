var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var attnd = module.exports = {};
var attendanceapi = require("../../reports/templates/attendance/attendance.js");

// Monthly and Daily Attendance

attnd.getAttendanceReports = function getAttendanceReports(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_attendance") + "($1,$2,$3,$4::json);", ['attndrpt1', 'attndrpt2', 'attndrpt3', req.query], function(data) {
        if (req.query.flag == "reports") {
            var formname = "";

            if (req.query.attndmonth == "") {
                formname = "attendance/monthlyattnd.html";
            } else {
                formname = "attendance/dailyattnd.html";
            }

            download(req, res, {
                attndhead: data.rows[0],
                psngrcolumn: data.rows[0][0].psngrcolumn,
                allattndcolumn: data.rows[0][0].attndcolumn,
                attndcolumn: data.rows[0][0].attndcolumn.filter(function(x) { return x.typ == "attnd" }),
                monthcolumn: data.rows[0][0].attndcolumn.filter(function(x) { return x.id == 1 }),

                classwiseattnd: data.rows[1],
                studentwiseattnd: data.rows[2],
                params: req.query
            }, { 'all': formname }, attendanceapi.getAttendanceReports);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}

// Student Many Types Of Attendance Reports

attnd.getStudentAttendanceReports = function getStudentAttendanceReports(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_studentattendance") + "($1,$2,$3::json);", ['studrpt1', 'studrpt2', req.query], function(data) {
        var formname = "";

        if (req.query.flag == "average") {
            formname = "attendance/averageattnd.html";
        } else {
            formname = "attendance/statuswiseattnd.html";
        }

        if (req.query.type == "download") {
            download(req, res, {
                dataheader: data.rows[0],
                datatable: data.rows[1],
                params: req.query
            }, { 'all': formname }, attendanceapi.getStudentAttendanceReports);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}