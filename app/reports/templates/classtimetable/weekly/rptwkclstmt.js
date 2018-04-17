var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

var handlebars = require('handlebars'),
    groupBy = require('handlebars-group-by');

groupBy.register(handlebars);

reports.getWeeklyClassTimeTable = function getWeeklyClassTimeTable(data) {
    var _hndlbar = Handlebars;

    var weeklyData = data.weeklyData;
    var weeklyColumn = data.weeklyColumn;

    // Hide When

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (weeklyData.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
    });

    // weekly Data

    _hndlbar.registerHelper('getweeklydata', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < weeklyColumn.length; i++) {
            data = row[weeklyColumn[i].monthname];
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '0' : data) + '</td>'
        }

        return columns;
    });

    return _hndlbar;
}