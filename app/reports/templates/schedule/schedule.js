var Handlebars = require('handlebars');
var reports = module.exports = {};
var globals = require("gen").globals;

var groupBy = require('handlebars-group-by');
groupBy.register(Handlebars);

reports.getScheduleReports = function getScheduleReports(data) {
    var _hndlbar = Handlebars;
    var feesdt = data.data;
    var params = data.params;

    _hndlbar.registerHelper('nodatafound', function(row) {
        if (feesdt.length == 0) {
            return "show";
        } else {
            return "hide";
        }
    });

    return _hndlbar;
}