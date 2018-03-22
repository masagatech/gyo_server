var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getMilegeReports = function getMilegeReports(data) {
    var _hndlbar = Handlebars;
    var milegedt = data.data;

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

    _hndlbar.registerHelper('maxspd_total', function(params) {
        var totmaxspd = 0;

        for (var i = 0; i < milegedt.length; i++) {
            var _d = milegedt[i];

            totmaxspd += _d.maxspd;
        }

        return totmaxspd;
    });

    _hndlbar.registerHelper('milege_total', function(params) {
        var totmilege = 0;

        for (var i = 0; i < milegedt.length; i++) {
            var _d = milegedt[i];

            totmilege += _d.milege;
        }

        return totmilege.toFixed(2);
    });

    _hndlbar.registerHelper('showdata', function(params) {
        if (milegedt.length == 0) {
            return "hide";
        } else {
            return "show";
        }
    });

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (milegedt.length == 0) {
            return "show";
        } else {
            return "hide";
        }
    });

    return _hndlbar;
}