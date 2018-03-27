var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getNotificationReports = function getNotificationReports(data) {
    var _hndlbar = Handlebars;
    var notificationdt = data.data;
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
        if (notificationdt.length == 0) {
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
        if (notificationdt.length == 0) {
            return "hide";
        } else {
            if (dparams.type == "manual") {
                if (headerdt.ntfid == 0) {
                    return "hide";
                } else {
                    return "show";
                }
            } else {
                return "show";
            }
        }
    });

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (notificationdt.length == 0) {
            return "No Data Found";
        } else {
            if (dparams.type == "manual") {
                if (headerdt.ntfid == 0) {
                    return "No Data Found";
                } else {
                    return "";
                }
            } else {
                return "";
            }
        }
    });

    return _hndlbar;
}