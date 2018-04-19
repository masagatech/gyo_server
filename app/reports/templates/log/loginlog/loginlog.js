var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

reports.getLoginLogReports = function getLoginLogReports(data) {
    var _hndlbar = Handlebars;
    var dataheader = data.data;
    var loginlogdt = data.data1;

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (loginlogdt.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
    });

    return _hndlbar;
}