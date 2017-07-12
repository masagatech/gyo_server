var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var genset = module.exports = {};

genset.saveGeneralSetting = function saveGeneralSetting(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_generalsetting") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

genset.getGeneralSetting = function getGeneralSetting(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_generalsetting") + "($1,$2::json);", ['gset', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}