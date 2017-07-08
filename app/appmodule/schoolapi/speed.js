var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var speed = module.exports = {};

speed.saveSpeedVialation = function saveSpeedVialation(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_speedvialation") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}