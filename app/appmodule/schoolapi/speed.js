var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var speed = module.exports = {};

speed.saveSpeedVialation = function saveSpeedVialation(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_speedvialation") + "($1::json);", [req.body], function(data) {
        if (res)
            rs.resp(res, 200, data.rows);
        else
            return data.rows;

    }, function(err) {
        if (res)
            rs.resp(res, 401, "error : " + err);
        else {
            console.log(err);
            return err;
        }
    });
}