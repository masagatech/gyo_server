var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var audit = module.exports = {};

audit.saveAuditLog = function saveAuditLog(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_auditlog") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

audit.getAuditLog = function getAuditLog(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_auditlog") + "($1,$2::json);", ['al', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}