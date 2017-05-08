var db = require("../../db/dbservice.js");
var rs = require("../util/resp.js");
var globals = require("../../globals.js");

var menus = module.exports = {};

menus.saveMenuInfo = function saveMenuInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_menuinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}