var Handlebars = require('handlebars');
var reports = module.exports = {};
var globals = require("gen").globals;

var groupBy = require('handlebars-group-by');
groupBy.register(Handlebars);

reports.getVehicleMasterReports = function getVehicleMasterReports(data) {
    var _hndlbar = Handlebars;

    var vehdata = data.data;
    var params = data.params;

    // Set Font Size

    var font07 = 'style = "font-size: 7px;"';
    var font10 = 'style = "font-size: 10px;"';
    var font12 = 'style = "font-size: 12px;"';
    var font13 = 'style = "font-size: 13px;"';
    var font18 = 'style = "font-size: 18px;"';

    _hndlbar.registerHelper('font-07', function(row) {
        if (params.format == "pdf") {
            return font07;
        } else {
            return font12;
        }
    });

    _hndlbar.registerHelper('font-10', function(row) {
        if (params.format == "pdf") {
            return font10;
        } else {
            return font13;
        }
    });

    _hndlbar.registerHelper('font-13', function(row) {
        if (params.format == "pdf") {
            return font13;
        } else {
            return font18;
        }
    });

    // No Data Found

    _hndlbar.registerHelper('nodatafound', function(row) {
        if (vehdata.length == 0) {
            return '<tr><td colspan="7">No Data Found</th></td>';
        } else {
            return '';
        }
    });

    return _hndlbar;
}