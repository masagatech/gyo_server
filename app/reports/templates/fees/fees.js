var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

var handlebars = require('handlebars');
var groupBy = require('handlebars-group-by');
var NumeralHelper = require("handlebars.numeral");

groupBy.register(handlebars);
NumeralHelper.registerHelpers(handlebars);

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

    _hndlbar.registerHelper('uploadurl', function(params) {
        return globals.uploadurl;
    });

    _hndlbar.registerHelper('logourl', function(params) {
        return globals.logourl;
    });

    return _hndlbar;
}

reports.getFeesLedgerReports = function getFeesLedgerReports(data) {
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

    _hndlbar.registerHelper('splitTitle', function(head) {
        var t = head.split("~");
        var head = "";

        if (params.format == "pdf") {
            head = "<th " + font08 + ">Class : " + t[0] + " - " + t[1] + "</th>";
            head += "<th " + font08 + " colspan='2'>Paid Fees : " + t[2] + ", ";
        } else {
            head = "<th>Class : " + t[0] + " - " + t[1] + "</th>";
            head += "<th colspan='2'>Paid Fees : " + t[2] + ", ";
        }

        head += "Complete Fees : " + t[3] + ", ";
        head += "Process Fees : " + t[4] + ", ";
        head += "Pending Fees : " + t[5] + "</th>";

        return head;
    });

    _hndlbar.registerHelper('splitHead', function(head) {
        var t = head.split("~");

        if (params.format == "pdf") {
            return "<th " + font08 + "><b>Receipt No : </b>" + t[1] + "</th><th " + font08 + " colspan='2'><b>Paid on : </b>" + t[0] + "</th>";
        } else {
            return "<th><b>Receipt No : </b>" + t[1] + "</th><th colspan='2'><b>Paid on : </b>" + t[0] + "</th>";
        }
    });

    _hndlbar.registerHelper('totalPaidFees', function(head) {
        var t = head.split("~");

        if (params.format == "pdf") {
            return "<th " + font08 + "></th><th " + font08 + " colspan='2'><b>Total Amount : </b>" + t[3] + "</th>";
        } else {
            return "<th></th><th colspan='2'><b>Total Amount : </b>" + t[3] + "</th>";
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