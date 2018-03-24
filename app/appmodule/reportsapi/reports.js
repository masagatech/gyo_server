var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var http = require('http');
var request = require('request');

var rptmilegeapi = require("../../reports/templates/milege/milege.js");

var rptspeedapi = require("../../reports/templates/speed/speed.js");

var reports = module.exports = {};

reports.getReports = function getReports(req, res, done) {
    var vhid = req.query.vhid;
    var arrvhid = new Array();
    arrvhid = vhid.split(",");

    var flag = req.query.flag;
    var rpttype = req.query.rpttype;
    var frmdt = req.query.frmdt + "T00:00:00+05:30";
    var todt = req.query.todt + "T00:00:00+05:30";

    request.post(
        globals.serverapiurl, {
            json: {
                "reporttyp": rpttype,
                "params": {
                    "vhid": arrvhid,
                    "frmdt": frmdt,
                    "todate": todt,
                    "type": flag == "summary" ? "" : "details"
                }
            }
        },
        function(error, response, data) {
            if (req.query.vwtype == "download") {
                if (rpttype == "milege") {
                    download(req, res, {
                        data: data.data == null ? [] : data.data
                    }, { 'all': 'milege/milege.html' }, rptmilegeapi.getMilegeReports);
                } else {
                    if (flag == "summary") {
                        download(req, res, {
                            data: data.data == null ? [] : data.data
                        }, { 'all': 'speed/summary.html' }, rptspeedapi.getSpeedReports);
                    } else {
                        download(req, res, {
                            data: data.data == null ? [] : data.data
                        }, { 'all': 'speed/details.html' }, rptspeedapi.getSpeedReports);
                    }
                }
            } else {
                rs.resp(res, 200, data.data);
            }
        },
        function(err) {
            rs.resp(res, 401, "error : " + err);
        }
    );
}