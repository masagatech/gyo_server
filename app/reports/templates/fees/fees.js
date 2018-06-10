var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

var groupBy = require('handlebars-group-by');
var NumeralHelper = require("handlebars.numeral");

groupBy.register(Handlebars);
NumeralHelper.registerHelpers(Handlebars);

reports.getClassFeesReports = function getClassFeesReports(data) {
    var _hndlbar = Handlebars;

    return _hndlbar;
}

reports.getStudentFeesReports = function getStudentFeesReports(data) {
    var _hndlbar = Handlebars;
    var feesdt = data.data1;
    var params = data.params;

    var font08 = 'style = "font-size: 8px;"';
    var font10 = 'style = "font-size: 10px;"';
    var font12 = 'style = "font-size: 12px;"';

    _hndlbar.registerHelper('font-08', function(row) {
        if (params.format == "pdf") {
            return font08;
        } else {
            return "";
        }
    });

    _hndlbar.registerHelper('font-10', function(row) {
        if (params.format == "pdf") {
            return font10;
        } else {
            return "";
        }
    });

    _hndlbar.registerHelper('font-12', function(row) {
        if (params.format == "pdf") {
            return font12;
        } else {
            return "";
        }
    });

    _hndlbar.registerHelper('showHeader', function(row) {
        if (params.format == "html") {
            return "hide";
        } else {
            return "show";
        }
    });

    _hndlbar.registerHelper('showDuplicate', function(row) {
        if (params.format == "pdf") {
            return "show";
        } else {
            return "hide";
        }
    });

    _hndlbar.registerHelper('isShowLogo', function(param, options) {
        if (param == "hide") {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

    _hndlbar.registerHelper('splitStudent', function(head) {
        var t = head.split("~");
        var head = "";

        if (params.format == "pdf") {
            head = "<th " + font08 + "><b>Class : </b>" + t[0] + " - (" + t[1] + ")</th>";
            head += "<th " + font08 + " colspan='2'>Roll No : " + t[2] + " - Student Name : " + t[3];
        } else {
            head = "<th><b>Class : </b>" + t[0] + " - (" + t[1] + ")</th>";
            head += "<th colspan='2'>Roll No : " + t[2] + " - Student Name : " + t[3];
        }

        return head;

        var t = head.split("~");
        var head = "Class : " + t[0] + " - (" + t[1] + ") - Roll No : " + t[2] + " - Student Name : " + t[3];

        return head;
    });

    _hndlbar.registerHelper('splitTitle', function(head) {
        var t = head.split("~");
        var head = "";

        if (params.format == "pdf") {
            head = "<th " + font08 + "><b>Receipt No : </b>" + t[0] + ", <b>Paid on : </b>" + t[1] + "</th>";
            head += "<th " + font08 + " colspan='2'>Complete Fees : " + t[3] + ", ";
        } else {
            head = "<th><b>Receipt No : </b>" + t[0] + ", <b>Paid on : </b>" + t[1] + "</th>";
            head += "<th colspan='2'>Complete Fees : " + t[3] + ", ";
        }

        head += "Process Fees : " + t[4] + "</th>";

        return head;
    });

    _hndlbar.registerHelper('splitFoot', function(head) {
        var t = head.split("~");
        var head = "";

        head += "<tr><td></td><td colspan='2' align='right'>Amount Received : " + t[4] + "</td></tr>";
        head += "<tr><td></td><td colspan='2' align='right'>Balance Due : " + t[5] + "</td></tr>";

        return head;
    });

    _hndlbar.registerHelper('totalPaidFees', function(head) {
        var t = head.split("~");

        if (params.format == "pdf") {
            return "<th " + font08 + "></th><th " + font08 + " colspan='2'><b>Total Amount : </b>" + t[2] + "</th>";
        } else {
            return "<th></th><th colspan='2'><b>Total Amount : </b>" + t[2] + "</th>";
        }
    });

    _hndlbar.registerHelper('uploadurl', function(params) {
        return globals.uploadurl;
    });

    _hndlbar.registerHelper('logourl', function(params) {
        return globals.logourl;
    });

    return _hndlbar;
}

reports.getFeesSleepReports = function getFeesSleepReports(data) {
    var _hndlbar = Handlebars;
    var feesdt = data.data1;
    var params = data.params;

    _hndlbar.registerHelper('summ_dtls', function(param, options) {
        if (param == "N") {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

    // _hndlbar.registerHelper('othercat', function(params) {
    //     var _othfees = "";
    //     var _othercat = "";

    //     for (var i = 0; i < feesdt.length; i++) {
    //         _othfees = feesdt[i].catdetails;

    //         for (var j = 7; j < _othfees.length; j++) {
    //             _othercat += _othfees[j].catname + " - " + _othfees[j].paidfees + ", ";
    //         }
    //     }

    //     return _othercat;
    // });

    // _hndlbar.registerHelper('otherfees', function(params) {
    //     var _othtotfess = 0;

    //     for (var i = 0; i < feesdt.length; i++) {
    //         _othtotfess = parseFloat(feesdt[i].paidfees) -
    //             (
    //                 feesdt[i].catdetails[0] == undefined ? "" : parseFloat(feesdt[i].catdetails[0].paidfees) +
    //                 feesdt[i].catdetails[1] == undefined ? "" : parseFloat(feesdt[i].catdetails[1].paidfees) +
    //                 feesdt[i].catdetails[2] == undefined ? "" : parseFloat(feesdt[i].catdetails[2].paidfees) +
    //                 feesdt[i].catdetails[3] == undefined ? "" : parseFloat(feesdt[i].catdetails[3].paidfees) +
    //                 feesdt[i].catdetails[4] == undefined ? "" : parseFloat(feesdt[i].catdetails[4].paidfees) +
    //                 feesdt[i].catdetails[5] == undefined ? "" : parseFloat(feesdt[i].catdetails[5].paidfees) +
    //                 feesdt[i].catdetails[6] == undefined ? "" : parseFloat(feesdt[i].catdetails[6].paidfees)
    //             );
    //     }

    //     return _othtotfess;
    // });

    _hndlbar.registerHelper('uploadurl', function(params) {
        return globals.uploadurl;
    });

    _hndlbar.registerHelper('logourl', function(params) {
        return globals.logourl;
    });

    _hndlbar.registerHelper('showDuplicate', function(row) {
        if (params.vwtype == "parent") {
            return "hide";
        } else {
            return "show";
        }
    });

    return _hndlbar;
}