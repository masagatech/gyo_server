var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var rptpsngr = module.exports = {};
var psngrrptapi = require("../../reports/templates/passenger/passenger.js");

rptpsngr.getPassengerReports = function getPassengerReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_rpt_passengerdetails") + "($1,$2,$3::json);", ['rptpsngr1', 'rptpsngr2', req.query], function (data) {
        var formname = "";
        var apiname = "";

        if (req.query.flag == "student") {
            formname = "passenger/student.html";
        }
        else if (req.query.flag == "profile") {
            formname = "passenger/passenger.html";
        }
        else if (req.query.flag == "gr_report") {
            formname = "passenger/gr_report.html";
        }
        else {
            formname = "passenger/birthday.html";
        }

        apiname = psngrrptapi.getPassengerReports;

        download(req, res, {
            psngrhead: data.rows[0],
            psngrdata: data.rows[1],
            params: req.query
        }, { 'all': formname }, apiname);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}