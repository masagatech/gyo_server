var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var employee = module.exports = {};

employee.saveEmployeeInfo = function saveEmployeeInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_employeeinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

employee.getEmployeeDetails = function getEmployeeDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_employeedetails") + "($1,$2::json);", ['emp', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}