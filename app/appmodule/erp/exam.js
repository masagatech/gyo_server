var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var exam = module.exports = {};

// Exam

exam.saveExamInfo = function saveExamInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_examinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

exam.getExamDetails = function getExamDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_examdetails") + "($1,$2::json);", ['exam', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Exam Result

exam.saveExamResult = function saveExamResult(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_examresult") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

exam.getExamResult = function getExamResult(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_examresult") + "($1,$2::json);", ['examres', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}