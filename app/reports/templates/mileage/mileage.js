var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getMileageReports = function getMileageReports(data) {
    var _hndlbar = Handlebars;
    var mileagedt = data.data;

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

        for (var i = 0; i < mileagedt.length; i++) {
            var _d = mileagedt[i];

            totmaxspd += _d.maxspd;
        }

        return totmaxspd;
    });

    _hndlbar.registerHelper('mileage_total', function(params) {
        var totmileage = 0;

        for (var i = 0; i < mileagedt.length; i++) {
            var _d = mileagedt[i];

            totmileage += _d.mileage;
        }

        return totmileage.toFixed(2);
    });

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