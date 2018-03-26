var Handlebars = require('handlebars');
var reports = module.exports = {};

reports.getAnnouncementReports = function getAnnouncementReports(data) {
    var _hndlbar = Handlebars;
    var adt = data.data;

    var col_total = [];

    _hndlbar.registerHelper('showdata', function(params) {
        if (mileagedt.length == 0) {
            return "hide";
        } else {
            return "show";
        }
    });

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (mileagedt.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
    });

    return _hndlbar;
}