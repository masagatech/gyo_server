var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var ass = module.exports = {};
var tripapi = require("../erp/assesment.js");

// Assesment Bench

ass.saveAssesmentInfo = function saveAssesmentInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_assesmentinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

ass.getAssesmentDetails = function getAssesmentDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_assesmentdetails") + "($1,$2::json);", ['ass', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Assesment Result

ass.saveAssesmentResult = function saveAssesmentResult(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_assesmentresult") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

ass.getAssesmentResult = function getAssesmentResult(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_assesmentresult") + "($1,$2::json);", ['assres', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}