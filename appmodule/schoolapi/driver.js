var db = require("../../db/dbservice.js");
var rs = require("../util/resp.js");
var globals = require("../../globals.js");

var driver = module.exports = {};

driver.saveDriverInfo = function saveDriverInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_driverinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

driver.getDriverGrid = function getDriverGrid(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_drivergrid") + "($1,$2,$3::json);", ['drv1', 'drv2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

driver.getDriverDetails = function getDriverDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_driverdetails") + "($1,$2::json);", ['drv', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}