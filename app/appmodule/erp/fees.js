var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var fees = module.exports = {};

fees.saveClassFees = function saveClassInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_classfees") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

fees.getClassFees = function getClassFees(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_classfees") + "($1,$2,$3::json);", ['cf1', 'cf2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

fees.saveStudentFees = function saveStudentFees(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_studentfees") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

fees.getStudentFees = function getStudentFees(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_Studentfees") + "($1,$2::json);", ['sf', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}