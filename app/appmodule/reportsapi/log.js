var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var log = module.exports = {};

var logapi = require("../../reports/templates/log/loginlog/loginlog.js");

log.getLoginLogReports = function getLoginLogReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_rpt_userloginlog") + "($1,$2,$3::json);", ['logrpt1', 'logrpt2', req.query], function(data) {
        if (req.query.flag == "reports") {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1],
                params: req.query
            }, { 'all': 'log/loginlog/loginlog.html' }, logapi.getLoginLogReports);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}