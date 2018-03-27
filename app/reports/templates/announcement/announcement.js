var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getAnnouncementReports = function getAnnouncementReports(data) {
    var _hndlbar = Handlebars;
    var announcementdt = data.data;
    var headerdt = data.data1;
    var dparams = data.params;

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

    _hndlbar.registerHelper('groupName', function(params) {
        if (announcementdt.length == 0) {
            return "";
        } else {
            if (dparams.grpid == 0) {
                return "";
            } else {
                return headerdt.grpname + " - ";
            }
        }
    });

    _hndlbar.registerHelper('showdata', function(params) {
        if (announcementdt.length == 0) {
            return "hide";
        } else {
            if (headerdt.anncid == 0) {
                return "hide";
            } else {
                return "show";
            }
        }
    });

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (announcementdt.length == 0) {
            return "No Data Found";
        } else {
            if (headerdt.anncid == 0) {
                return "No Data Found";
            } else {
                return "";
            }
        }
    });

    return _hndlbar;
}