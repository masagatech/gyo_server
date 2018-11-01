var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

reports.getNotificationReports = function getNotificationReports(data) {
    var _hndlbar = Handlebars;
    var notificationdt = data.data;
    var headerdt = data.data1;
    var dparams = data.params;

    // Split Message

    _hndlbar.registerHelper('splitMessage1', function(row, head) {
        var t = "";

        if (row.status == 1) {
            t = head.split(";")[0];
        } else if (row.status == 0) {
            t = "Not Applicable";
        } else {
            t = "Trip Not Started";
        }

        return t;
    });

    _hndlbar.registerHelper('splitMessage2', function(row, head) {
        var t = "";

        if (row.status == 1) {
            t = head.split(";")[1];
        } else if (row.status == 0) {
            t = "Not Applicable";
        } else {
            t = "Trip Not Started";
        }

        return t;
    });

    // Split Date

    _hndlbar.registerHelper('splitDate1', function(row, head) {
        var t = "";

        if (row.status == 1) {
            t = head.split(";")[0];
        } else {
            t = "";
        }

        return t;
    });

    _hndlbar.registerHelper('splitDate2', function(row, head) {
        var t = "";

        if (row.status == 1) {
            t = head.split(";")[1];
        } else {
            t = "";
        }

        return t;
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

    _hndlbar.registerHelper('isvis', function(param, options) {
        if (param == "NA") {
            return options.inverse(this);
        } else {
            return options.fn(this);
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