var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

reports.getFeesReports = function getFeesReports(data) {
    var _hndlbar = Handlebars;
    var feesdt = data.data1;

    _hndlbar.registerHelper('showdata', function(params) {
        if (feesdt.length == 0) {
            return "hide";
        } else {
            return "show";
        }
    });

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (feesdt.length == 0) {
            return "No Data Found";
        } else {
            return "";
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