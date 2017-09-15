var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var acdmc = module.exports = {};

acdmc.saveAcademicYear = function saveAcademicYear(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_academicyear") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

acdmc.getAcademicYear = function getAcademicYear(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_academicyear") + "($1,$2::json);", ['ay', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}