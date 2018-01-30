var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var userdt = module.exports = {};

// User Details

userdt.saveUserCardDetails = function saveUserCardDetails(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_user_carddetails") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

userdt.getUserCardDetails = function getUserCardDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_user_carddetails") + "($1,$2::json);", ['usd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}