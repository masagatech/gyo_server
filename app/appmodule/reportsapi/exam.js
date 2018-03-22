var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var exam = module.exports = {};

var reportsapi = require("../../reports/apis/reports.js");

exam.downloadExamResult = function downloadExamResult(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_examresult") + "($1,$2::json);", ['examresrpt', req.query], function(data) {
        if (req.query.type == "all") {
            download(req, res, {
                data: data.rows,
                params: req.query
            }, { 'all': 'examresult/examresultformat.html' }, reportsapi.getReports);
        } else {
            download(req, res, {
                data: data.rows[0],
                params: req.query
            }, { 'all': 'examresult/examresultformat.html' }, reportsapi.getReports);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}