var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var timetable = module.exports = {};

var classapi = require("../../reports/templates/classtimetable/classtimetable.js");

timetable.getClassTimeTableReports = function getClassTimeTableReports(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_classtimetable") + "($1,$2,$3,$4::json);", ['clstmtrpt1', 'clstmtrpt2', 'clstmtrpt3', req.query], function(data) {
        download(req, res, {
            weekperiodDT: data.rows[0],
            monweekcolumn: data.rows[1].filter(function(x) { return x.week == "Monday" }),
            tueweekcolumn: data.rows[1].filter(function(x) { return x.week == "Tuesday" }),
            wedweekcolumn: data.rows[1].filter(function(x) { return x.week == "Wednesday" }),
            thuweekcolumn: data.rows[1].filter(function(x) { return x.week == "Thursday" }),
            friweekcolumn: data.rows[1].filter(function(x) { return x.week == "Friday" }),
            satweekcolumn: data.rows[1].filter(function(x) { return x.week == "Saturday" }),
            sunweekcolumn: data.rows[1].filter(function(x) { return x.week == "Sunday" }),
            classTimeTableDT: data.rows[2],
            params: req.query
        }, { 'all': 'classtimetable/rptprdclstmt.html' }, classapi.getClassTimeTableReports);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}