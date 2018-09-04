var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var user = module.exports = {};
var usermstapi = require("../../reports/templates/master/user/user.js");

user.getUserReports = function getUserReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_userdetails") + "($1,$2::json);", ['usr', req.query], function(data) {
        download(req, res, {
            data: data.rows,
            params: req.query
        }, { 'all': "master/user/user.html" }, usermstapi.getUserMasterReports);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}