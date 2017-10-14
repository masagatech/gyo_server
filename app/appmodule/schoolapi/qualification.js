var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var qlf = module.exports = {};

qlf.saveQualificationInfo = function saveQualificationInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_qualificationinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

qlf.getQualificationDetails = function getQualificationDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_qualificationdetails") + "($1,$2::json);", ['qlf', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}