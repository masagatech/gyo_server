var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getMonthlyClassTimeTable = function getMonthlyClassTimeTable(data) {
    var _hndlbar = Handlebars;

    var monthlyData = data.monthlyData;
    var monthlyColumn = data.monthlyColumn;

    // Hide When

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (monthlyData.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
    });

    // Monthly Data

    _hndlbar.registerHelper('getmonthlydata', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < monthlyColumn.length; i++) {
            data = row[monthlyColumn[i].monthname];
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '0' : data) + '</td>'
        }

        return columns;
    });

    return _hndlbar;
}