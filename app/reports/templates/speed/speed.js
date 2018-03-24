var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getSpeedReports = function getSpeedReports(data) {
    var _hndlbar = Handlebars;
    var speeddt = data.data;

    var col_total = [];

    var DateFormats = {
        short: "DD/MMM/YYYY",
        medium: "DD MMMM - YYYY",
        long: "dddd DD.MM.YYYY HH:mm",
        withtime: "DD/MMM/YYYY HH:mm"
    };

    _hndlbar.registerHelper("formatDate", function(datetime, format) {
        if (moment) {
            format = DateFormats[format] || format;
            return moment(datetime).format(format);
        } else {
            return datetime;
        }
    });

    _hndlbar.registerHelper('count_total', function(params) {
        var totcount = 0;

        for (var i = 0; i < speeddt.length; i++) {
            var _d = speeddt[i];

            totcount += _d.count;
        }

        return totcount;
    });

    _hndlbar.registerHelper('speed_total', function(params) {
        var totspeed = 0;

        for (var i = 0; i < speeddt.length; i++) {
            var _d = speeddt[i];

            totspeed += _d.speed;
        }

        return totspeed;
    });

    _hndlbar.registerHelper('alwspeed_total', function(params) {
        var totalwspeed = 0;

        for (var i = 0; i < speeddt.length; i++) {
            var _d = speeddt[i];

            totalwspeed += _d.alwspeed;
        }

        return totalwspeed;
    });

    _hndlbar.registerHelper('distance', function(params) {
        var distance = 0;

        distance = parseFloat(params.speed) - parseFloat(params.alwspeed);

        return distance;
    });

    _hndlbar.registerHelper('distance_total', function(params) {
        var totspeed = 0;
        var totalwspeed = 0;

        for (var i = 0; i < speeddt.length; i++) {
            var _d = speeddt[i];

            totspeed += _d.speed;
            totalwspeed += _d.alwspeed;
        }

        return parseFloat(totspeed) - parseFloat(totalwspeed);
    });

    _hndlbar.registerHelper('showdata', function(params) {
        if (speeddt.length == 0) {
            return "hide";
        } else {
            return "show";
        }
    });

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (speeddt.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
    });

    return _hndlbar;
}