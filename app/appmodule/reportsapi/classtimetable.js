var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var timetable = module.exports = {};

var prdtmtapi = require("../../reports/templates/classtimetable/period/rptprdclstmt.js");
var montmtapi = require("../../reports/templates/classtimetable/monthly/rptmonclstmt.js");
var wktmtapi = require("../../reports/templates/classtimetable/weekly/rptwkclstmt.js");

// Period-Wise Timetable

timetable.getClassTimeTablePeriod = function getClassTimeTablePeriod(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_classtimetable_period") + "($1,$2,$3,$4::json);", ['prdtmtrpt1', 'prdtmtrpt2', 'prdtmtrpt3', req.query], function(data) {
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
        }, { 'all': 'classtimetable/period/rptprdclstmt.html' }, prdtmtapi.getPeriodClassTimeTable);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}

// Monthly Timetable

timetable.getClassTimeTableMonthly = function getClassTimeTableMonthly(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_classtimetable_monthly") + "($1,$2,$3,$4::json);", ['montmtrpt1', 'montmtrpt2', 'montmtrpt3', req.query], function(data) {
        download(req, res, {
            headerColumn: data.rows[0],
            monthlyColumn: data.rows[1],
            monthlyData: data.rows[2],
            params: req.query
        }, { 'all': 'classtimetable/monthly/rptmonclstmt.html' }, montmtapi.getMonthlyClassTimeTable);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}

// Weekly Timetable

timetable.getClassTimeTableWeekly = function getClassTimeTableWeekly(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_classtimetable_weekly") + "($1,$2,$3::json);", ['wktmtrpt1', 'wktmtrpt2', req.query], function(data) {
        download(req, res, {
            headerColumn: data.rows[0],
            weeklyData: data.rows[1],
            params: req.query
        }, { 'all': 'classtimetable/weekly/rptwkclstmt.html' }, wktmtapi.getWeeklyClassTimeTable);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}