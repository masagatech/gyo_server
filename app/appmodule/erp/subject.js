var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var sub = module.exports = {};

sub.saveSubjectInfo = function saveSubjectInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_subjectinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

sub.getSubjectDetails = function getSubjectDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_subjectdetails") + "($1,$2::json);", ['sub', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}