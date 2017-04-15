var db = require("../db/dbservice.js");
var rs = require("./util/resp.js");
var globals = require("../globals.js");


var driverinfo = module.exports = {};

driverinfo.saveDriverInfo = function saveDriverInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_driverinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

driverinfo.getDriverGrid = function getDriverGrid(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_driverinfogrid") + "($1,$2,$3::json);", ['drvinfo', 'drvinfo_num', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

driverinfo.getDriverDetail = function getDriverDetail(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_driverinfodetails") + "($1,$2::json);", ['drverdetail', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}