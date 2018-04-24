var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var noticeboard = module.exports = {};

noticeboard.saveNoticeboard = function saveNoticeboard(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_noticeboard") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

noticeboard.getNoticeboard = function getNoticeboard(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_noticeboard") + "($1,$2::json);", ['nb', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}