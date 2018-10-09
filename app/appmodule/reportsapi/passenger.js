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

        var parentheadcolumn = [];
        var psngrheadcolumn = [];

        if (req.query.flag == "student") {
            formname = "passenger/student.html";
            parentheadcolumn = [];
            psngrheadcolumn = [];
        } else if (req.query.flag == "profile") {
            if (req.query.psngrtype == "passenger") {
                formname = "passenger/passenger.html";
            } else {
                formname = "passenger/staff.html";
            }

            parentheadcolumn = [];
            psngrheadcolumn = [];
        } else if (req.query.flag == "gr_summary") {
            formname = "passenger/gr_summary.html";
            parentheadcolumn = [];
            psngrheadcolumn = [];
        } else if (req.query.flag == "gr_details") {
            formname = "passenger/gr_details.html";
            parentheadcolumn = [];
            psngrheadcolumn = [];
        } else if (req.query.flag == "catwise_summary") {
            formname = "passenger/catwise_summary.html";
            parentheadcolumn = [];
            psngrheadcolumn = data.rows[0][0].catcolumn;
        } else if (req.query.flag == "catwise_details") {
            formname = "passenger/catwise_details.html";
            parentheadcolumn = [];
            psngrheadcolumn = [];
        } else if (req.query.flag == "prospectus_wise") {
            formname = "passenger/prospectuswise.html";
            parentheadcolumn = [];
            psngrheadcolumn = [];
        } else if (req.query.flag == "agewise") {
            formname = "passenger/agewise.html";
            parentheadcolumn = data.rows[0][0].stdgndrcolumn.filter(function(x) { return x.id == 1 });
            psngrheadcolumn = data.rows[0][0].stdgndrcolumn;
        } else if (req.query.flag == "birthday") {
            formname = "passenger/birthday.html";
            parentheadcolumn = [];
            psngrheadcolumn = [];
        } else if (req.query.flag == "left") {
            formname = "passenger/leftpsngr.html";
            parentheadcolumn = [];
            psngrheadcolumn = [];
        } else {
            formname = "passenger/parents.html";
            parentheadcolumn = [];
            psngrheadcolumn = [];
        }

        apiname = psngrrptapi.getPassengerReports;

        download(req, res, {
            psngrhead: data.rows[0],
            psngrheadcolumn: psngrheadcolumn,
            parentheadcolumn: parentheadcolumn,
            psngrdata: data.rows[1],
            params: req.query
        }, { 'all': formname }, apiname);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}