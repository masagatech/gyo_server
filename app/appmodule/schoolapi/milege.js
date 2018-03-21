var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var http = require('http');
var request = require('request');

var reportsapi = require("../../reports/apis/reports.js");

var milege = module.exports = {};

milege.getMilegeDetails = function getMilegeDetails(req, res, done) {
    var vhid = req.query.vhid;
    var arrvhid = new Array();
    arrvhid = vhid.split(",");

    var rpttype = req.query.rpttype;
    var frmdt = req.query.frmdt + "T00:00:00+05:30";
    var todt = req.query.todt + "T00:00:00+05:30";

    request.post(
        globals.milegerurl, {
            // json: {
            //     "reporttyp": "milege",
            //     "params": {
            //         "vhid": ["351777090309137","35177709030940"],
            //         "frmdt": "2017-09-01T00:00:00+05:30",
            //         "todate": "2018-02-15T00:00:00+05:30"
            //     }
            // }

            json: {
                "reporttyp": rpttype,
                "params": {
                    "vhid": arrvhid,
                    "frmdt": frmdt,
                    "todate": todt,
                    "type": req.query.flag == "summary" ? "" : "datewise"
                }
            }
        },
        function(error, response, data) {
            if (req.query.vwtype == "download") {
                download(req, res, {
                    data: data.data
                }, { 'all': 'milege/milege.html' }, reportsapi.getReports);
            } else {
                rs.resp(res, 200, data.data);
            }
        },
        function(err) {
            rs.resp(res, 401, "error : " + err);
        }
    );
}