var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var leave = module.exports = {};

leave.getTeacherLeave = function getTeacherLeave(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_rpt_teacherleave") + "($1,$2::json);", ['lv', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}