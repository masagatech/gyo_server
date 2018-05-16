var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var exam = module.exports = {};
var examresultapi = require("../../reports/templates/exam/examresult.js");

exam.downloadExamResult = function downloadExamResult(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_examresult") + "($1,$2::json);", ['examresdnl', req.query], function(data) {
        if (req.query.type == "all") {
            download(req, res, {
                data: data.rows,
                params: req.query
            }, { 'all': 'exam/examresultformat.html' }, examresultapi.getExamResultReports);
        } else {
            download(req, res, {
                data: data.rows[0],
                params: req.query
            }, { 'all': 'exam/examresultformat.html' }, examresultapi.getExamResultReports);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

exam.getExamResultReports = function getExamResultReports(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_examresult") + "($1,$2,$3::json);", ['examresrpt1', 'examresrpt2', req.query], function(data) {
        if (req.query.flag == "reports") {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1],
                data2: data.rows[0].filter(function(x) { return x.id == 1 }),
                data3: data.rows[0][0],
                params: req.query
            }, { 'all': 'exam/examresult_report.html' }, examresultapi.getExamResultReports);
        } else {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1],
                params: req.query
            }, { 'all': 'exam/examresult.html' }, examresultapi.getExamResultReports);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}