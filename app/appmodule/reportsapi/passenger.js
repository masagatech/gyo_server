var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var rptpsngr = module.exports = {};
var psngrrptapi = require("../../reports/templates/passenger/passenger.js");

rptpsngr.getPassengerReports = function getPassengerReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_rpt_passengerdetails") + "($1,$2,$3::json);", ['rptpsngr1', 'rptpsngr2', req.query], function(data) {
        var formname = "";
        var apiname = "";
        var psngrheadcolumn = [];

        if (req.query.flag == "student") {
            formname = "passenger/student.html";
            psngrheadcolumn = [];
        } else if (req.query.flag == "profile") {
            formname = "passenger/passenger.html";
            psngrheadcolumn = [];
        } else if (req.query.flag == "gr_summary") {
            formname = "passenger/gr_summary.html";
            psngrheadcolumn = [];
        } else if (req.query.flag == "gr_details") {
            formname = "passenger/gr_details.html";
            psngrheadcolumn = [];
        } else if (req.query.flag == "catwise_summary") {
            formname = "passenger/catwise_summary.html";
            psngrheadcolumn = data.rows[0][0].catcolumn;
        } else if (req.query.flag == "catwise_details") {
            formname = "passenger/catwise_details.html";
            psngrheadcolumn = [];
        } else {
            formname = "passenger/birthday.html";
        }

        apiname = psngrrptapi.getPassengerReports;

        download(req, res, {
            psngrhead: data.rows[0],
            psngrheadcolumn: psngrheadcolumn,
            psngrdata: data.rows[1],
            params: req.query
        }, { 'all': formname }, apiname);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}