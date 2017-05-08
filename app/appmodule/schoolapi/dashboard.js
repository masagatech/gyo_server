var db = require("../../db/dbservice.js");
var rs = require("../util/resp.js");
var globals = require("../../globals.js");


var dashboard = module.exports = {};

dashboard.getDashboard = function getDashboard(req, res, done) {
    db.callFunction("select " + globals.schema2("funget_dashboard") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}