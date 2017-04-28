var db = require("../../db/dbservice.js");
var rs = require("../util/resp.js");
var globals = require("../../globals.js");

var user = module.exports = {};

user.saveUserInfo = function saveUserInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_userinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

user.getUserDetails = function getUserDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_userdetails") + "($1,$2::json);", ['usr', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}