var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var announcement = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");

announcement.saveAnnouncement = function saveAnnouncement(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_announcement") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _dtr = {
            "flag": "parents_notification",
            "title": req.body.title,
            "body": req.body.msg,
            "toid": req.body.toid,
            "parentsid": data.rows[0].funsave_announcement.parentsid
        }

        tripapi.sendNotification(_dtr);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

announcement.getAnnouncement = function getAnnouncement(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_announcement") + "($1,$2::json);", ['annc', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}