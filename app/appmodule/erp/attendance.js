var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var attnd = module.exports = {};

attnd.saveAttendance = function saveAttendance(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_attendance") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

attnd.getAttendance = function getAttendance(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_attendance") + "($1,$2::json);", ['attd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}