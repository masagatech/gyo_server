var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var fuel = module.exports = {};

fuel.saveFuelEntry = function saveFuelEntry(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_fuelentry") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

fuel.getFuelEntry = function getFuelEntry(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_fuelentry") + "($1,$2::json);", ['fe', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}