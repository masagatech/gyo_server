var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var http = require('http');
var request = require('request');

var rptmileageapi = require("../../reports/templates/mileage/mileage.js");

var rptspeedapi = require("../../reports/templates/speed/speed.js");

var reports = module.exports = {};

// Post Method

reports.postReports = function postReports(req, res, done) {
    var vhid = req.body.vhid;
    var arrvhid = new Array();
    arrvhid = vhid.split(",");

    var flag = req.body.flag;
    var rpttype = req.body.rpttype;
    var frmdt = req.body.frmdt + "T00:00:00+05:30";
    var todt = req.body.todt + "T00:00:00+05:30";

    request.post(
        globals.serverapiurl, {
            json: {
                "reporttyp": rpttype == "mileage" ? "milege" : rpttype,
                "params": {
                    "vhid": arrvhid,
                    "frmdt": frmdt,
                    "todate": todt,
                    "type": flag == "summary" ? "" : "details"
                }
            }
        },
        function(error, response, data) {
            if (req.body.vwtype == "download") {
                if (rpttype == "mileage") {
                    download(req, res, {
                        data: data.data == null ? [] : data.data
                    }, { 'all': 'mileage/mileage.html' }, rptmileageapi.getMileageReports);
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

// Get Method

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
                "reporttyp": rpttype == "mileage" ? "milege" : rpttype,
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
                if (rpttype == "mileage") {
                    download(req, res, {
                        data: data.data == null ? [] : data.data
                    }, { 'all': 'mileage/mileage.html' }, rptmileageapi.getMileageReports);
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