var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var schedule = module.exports = {};
var schdapi = require("../../reports/templates/schedule/schedule.js");

schedule.getScheduleReports = function getScheduleReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_rpt_scheduledetails") + "($1,$2::json);", ['schd1', req.query], function(data) {
        if (req.query.type == "download") {
            download(req, res, {
                data: data.rows,
                params: req.query
            }, { 'all': "schedule/schedule.html" }, schdapi.getScheduleReports);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}