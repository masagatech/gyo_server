var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

reports.getNotificationReports = function getNotificationReports(data) {
    var _hndlbar = Handlebars;
    var notificationdt = data.data;
    var headerdt = data.data1;
    var dparams = data.params;

    _hndlbar.registerHelper('splitMessage1', function(head) {
        var t = head.split(";");
        return t[0];
    });

    _hndlbar.registerHelper('splitMessage2', function(head) {
        var t = head.split(";");
        return t[1];
    });

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

    _hndlbar.registerHelper('showvtsdata', function(params) {
        if (params.status == "nosend") {
            return "hide";
        } else {
            return "show";
        }
    });

    // Passenger Mobile No 1

    _hndlbar.registerHelper('psngrphone1_col', function(row) {
        var phinfo_col = "";

        if (row.isprntmob1 == "Y") {
            phinfo_col += row.mobileno1 + ' <img height="20" width="20" title="' + row.pregdate + '" src="' + globals.logourl + '/right.png">';
        } else {
            phinfo_col += row.mobileno1;
        }

        return phinfo_col;
    });

    // Passenger Mobile No 2

    _hndlbar.registerHelper('psngrphone2_col', function(row) {
        var phinfo_col = "";

        if (row.isprntmob2 == "Y") {
            phinfo_col += row.mobileno2 + ' <img height="20" width="20" title="' + row.mregdate + '" src="' + globals.logourl + '/right.png">';
        } else {
            phinfo_col += row.mobileno2;
        }

        return phinfo_col;
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