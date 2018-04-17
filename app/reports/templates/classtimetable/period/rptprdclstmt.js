var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getPeriodClassTimeTable = function getPeriodClassTimeTable(data) {
    var _hndlbar = Handlebars;

    var weekperiodDT = data.weekperiodDT;
    var monweekcolumn = data.monweekcolumn;
    var tueweekcolumn = data.tueweekcolumn;
    var wedweekcolumn = data.wedweekcolumn;
    var thuweekcolumn = data.thuweekcolumn;
    var friweekcolumn = data.friweekcolumn;
    var satweekcolumn = data.satweekcolumn;
    var sunweekcolumn = data.sunweekcolumn;
    var classTimeTableDT = data.classTimeTableDT;

    // Hide When

    _hndlbar.registerHelper('isvis', function(param, options) {
        if (param !== "" || param == "NA") {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (classTimeTableDT.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
    });

    // Get Period Data

    _hndlbar.registerHelper('monperioddata', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < monweekcolumn.length; i++) {
            data = row[monweekcolumn[i].period];
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>'
        }

        return columns;
    });

    _hndlbar.registerHelper('tueperioddata', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < tueweekcolumn.length; i++) {
            data = row[tueweekcolumn[i].period];
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>'
        }

        return columns;
    });

    _hndlbar.registerHelper('wedperioddata', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < wedweekcolumn.length; i++) {
            data = row[wedweekcolumn[i].period];
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>'
        }

        return columns;
    });

    _hndlbar.registerHelper('thuperioddata', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < thuweekcolumn.length; i++) {
            data = row[thuweekcolumn[i].period];
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>'
        }

        return columns;
    });

    _hndlbar.registerHelper('friperioddata', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < friweekcolumn.length; i++) {
            data = row[friweekcolumn[i].period];
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>'
        }

        return columns;
    });

    _hndlbar.registerHelper('satperioddata', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < satweekcolumn.length; i++) {
            data = row[satweekcolumn[i].period];
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>'
        }

        return columns;
    });

    _hndlbar.registerHelper('sunperioddata', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < sunweekcolumn.length; i++) {
            data = row[sunweekcolumn[i].period];
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>'
        }

        return columns;
    });

    return _hndlbar;
}