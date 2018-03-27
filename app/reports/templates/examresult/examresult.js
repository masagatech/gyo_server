var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getExamResultReports = function getExamResultReports(data) {
    var _hndlbar = Handlebars;
    var examdt = data.data;

    var col_total = [];

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

    _hndlbar.registerHelper('marks_total', function(params) {
        var totmarks = 0;

        for (var i = 0; i < examdt.length; i++) {
            var _d = examdt[i];

            totmarks += _d.marks;
        }

        return totmarks;
    });

    _hndlbar.registerHelper('outofmarks_total', function(params) {
        var totoutofmarks = 0;

        for (var i = 0; i < examdt.length; i++) {
            var _d = examdt[i];

            totoutofmarks += _d.outofmarks;
        }

        return totoutofmarks;
    });

    _hndlbar.registerHelper('showdata', function(params) {
        if (examdt.length == 0) {
            return "hide";
        } else {
            return "show";
        }
    });

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (examdt.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
    });

    return _hndlbar;
}