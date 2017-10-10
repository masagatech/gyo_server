var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var chapter = module.exports = {};

chapter.saveChapterInfo = function saveChapterInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_chapterinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

chapter.getChapterDetails = function getChapterDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_chapterdetails") + "($1,$2::json);", ['chptr', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}