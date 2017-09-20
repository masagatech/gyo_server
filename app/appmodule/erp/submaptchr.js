var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var submaptchr = module.exports = {};

submaptchr.saveSubjectMapToTeacher = function saveClassInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_submapteacher") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

submaptchr.getSubjectMapToTeacher = function getClassDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_submapteacher") + "($1,$2::json);", ['smt', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}