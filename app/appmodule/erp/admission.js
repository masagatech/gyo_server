var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var admsn = module.exports = {};

admsn.saveAdmissionInfo = function saveAdmissionInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_admissioninfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

admsn.saveStudentInfo = function saveStudentInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_studentinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

admsn.getStudentDetails = function getStudentDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_studentdetails") + "($1,$2::json);", ['sd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

admsn.viewStudentDetails = function viewStudentDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_studentview") + "($1,$2,$3::json);", ['sd1', 'sd2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

admsn.getPassengerDetails = function getPassengerDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_passengerdetails") + "($1,$2::json);", ['psngr', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}