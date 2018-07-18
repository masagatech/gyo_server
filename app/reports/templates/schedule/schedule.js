var Handlebars = require('handlebars');
var reports = module.exports = {};
var globals = require("gen").globals;

var groupBy = require('handlebars-group-by');
groupBy.register(Handlebars);

reports.getScheduleReports = function getScheduleReports(data) {
    var _hndlbar = Handlebars;
    var feesdt = data.data;
    var params = data.params;

    // User ID Params

    _hndlbar.registerHelper('uid', function(row) {
        return params.uid;
    });

    // User Type Params

    _hndlbar.registerHelper('utype', function(row) {
        return params.utype;
    });

    _hndlbar.registerHelper('nodatafound', function(row) {
        if (feesdt.length == 0) {
            return "show";
        } else {
            return "hide";
        }
    });

    // Upload URL

    _hndlbar.registerHelper('reporturl', function(row) {
        return globals.reporturl;
    });

    return _hndlbar;
}