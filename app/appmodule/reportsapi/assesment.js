var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var assesment = module.exports = {};

var assresapi = require("../../reports/templates/assesment/assesmentresult.js");

assesment.getAssesmentResultReports = function getAssesmentResultReports(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_assesmentresult") + "($1,$2,$3::json);", ['assresrpt1', 'assresrpt2', req.query], function(data) {
        download(req, res, {
            data: data.rows[0],
            data1: data.rows[1],
            params: req.query
        }, { 'all': 'assesment/assesmentresult.html' }, assresapi.getAssesmentResultReports);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}