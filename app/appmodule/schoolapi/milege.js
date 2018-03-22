var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var http = require('http');
var request = require('request');

var rptmilegeapi = require("../../reports/templates/milege/milege.js");

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
                    data: data.data == null ? [] : data.data
                }, { 'all': 'milege/milege.html' }, rptmilegeapi.getMilegeReports);
            } else {
                rs.resp(res, 200, data.data);
            }
        },
        function(err) {
            rs.resp(res, 401, "error : " + err);
        }
    );
}