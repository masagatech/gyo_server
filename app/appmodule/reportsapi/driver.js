var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var driver = module.exports = {};
var drvtrnspapi = require("../../reports/templates/transport/driver/driver.js");
var drvmstapi = require("../../reports/templates/master/driver/driver.js");

driver.getDriverReports = function getDriverReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_driverdetails") + "($1,$2::json);", ['drv', req.query], function(data) {
        var formname = "";
        var apiname = null;

        if (req.query.flag == "trnsp_reports") {
            formname = "transport/driver/driver.html";
            apiname = drvtrnspapi.getDriverTransportReports;
        } else {
            formname = "master/driver/driver.html";
            apiname = drvmstapi.getDriverMasterReports;
        }

        download(req, res, {
            data: data.rows,
            params: req.query
        }, { 'all': formname }, apiname);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}