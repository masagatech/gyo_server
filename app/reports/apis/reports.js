var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getReports = function getReports(data) {
    var _hndlbar = Handlebars;

    var DateFormats = {
        short: "DD/MMM/YYYY",
        medium: "DD MMMM - YYYY",
        long: "dddd DD.MM.YYYY HH:mm"
    };

    _hndlbar.registerHelper("formatDate", function(datetime, format) {
        if (moment) {
            format = DateFormats[format] || format;
            return moment(datetime).format(format);
        } else {
            return datetime;
        }
    });

    return _hndlbar;
}