var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var smspack = module.exports = {};

smspack.saveSMSPack = function saveSMSPack(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_smspack") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

smspack.getSMSPack = function getSMSPack(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_smspack") + "($1,$2::json);", ['sp', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}