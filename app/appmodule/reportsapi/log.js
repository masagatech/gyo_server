var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var log = module.exports = {};

var loginlogapi = require("../../reports/templates/log/loginlog/loginlog.js");
var menulogapi = require("../../reports/templates/log/menulog/menulog.js");
var auditlogapi = require("../../reports/templates/log/auditlog/auditlog.js");

// Login Log

log.getLoginLogReports = function getLoginLogReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_rpt_userloginlog") + "($1,$2,$3::json);", ['ulogrpt1', 'ulogrpt2', req.query], function(data) {
        if (req.query.flag == "reports") {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1],
                params: req.query
            }, { 'all': 'log/loginlog/loginlog.html' }, loginlogapi.getLoginLogReports);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

// Menu Log

log.getMenuLogReports = function getMenuLogReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_rpt_usermenulog") + "($1,$2,$3::json);", ['mlogrpt1', 'mlogrpt2', req.query], function(data) {
        if (req.query.flag == "reports") {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1],
                params: req.query
            }, { 'all': 'log/menulog/menulog.html' }, menulogapi.getMenuLogReports);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

// Audit Log

log.getAuditLogReports = function getAuditLogReports(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_auditlog") + "($1,$2::json);", ['alrpt1', req.query], function(data) {
        var formname = "";
        var apiname = "";

        if (req.query.module == "student") {
            formname = "log/auditlog/student.html";
        }

        apiname = auditlogapi.getAuditLogReports;

        if (req.query.flag == "reports") {
            download(req, res, {
                data: data.rows[0],
                params: req.query
            }, { 'all': formname }, apiname);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}