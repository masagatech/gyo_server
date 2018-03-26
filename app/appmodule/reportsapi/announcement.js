var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var announcement = module.exports = {};

var rptanncapi = require("../../reports/templates/announcement/announcement.js");

announcement.getAnnouncement = function getAnnouncement(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_announcement") + "($1,$2::json);", ['rptannc', req.query], function(data) {
        if (req.query.flag == "reports") {
            download(req, res, {
                data: data.rows,
                data1: data.rows[0],
                params: req.query
            }, { 'all': 'announcement/announcement.html' }, rptanncapi.getAnnouncementReports);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}