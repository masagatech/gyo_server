var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var assignment = module.exports = {};

assignment.saveAssignmentInfo = function saveAssignmentInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_assignmentinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

assignment.getAssignmentDetails = function getAssignmentDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_assignmentdetails") + "($1,$2::json);", ['assnm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}