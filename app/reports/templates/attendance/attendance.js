var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getAttendanceReports = function getAttendanceReports(data) {
    var _hndlbar = Handlebars;
    var attndhead = data.attndhead;
    var psngrcolumn = data.psngrcolumn;
    var attndcolumn = data.attndcolumn;
    var attnddata = data.attnddata;
    var params = data.params;

    var font07 = 'style = "font-size: 7px;"';
    var font10 = 'style = "font-size: 10px;"';
    var font12 = 'style = "font-size: 12px;"';
    var font13 = 'style = "font-size: 13px;"';
    var font18 = 'style = "font-size: 18px;"';

    _hndlbar.registerHelper('font-07', function(row) {
        if (params.format == "pdf") {
            return font07;
        } else {
            return font12;
        }
    });

    _hndlbar.registerHelper('font-10', function(row) {
        if (params.format == "pdf") {
            return font10;
        } else {
            return font13;
        }
    });

    _hndlbar.registerHelper('font-13', function(row) {
        if (params.format == "pdf") {
            return font13;
        } else {
            return font18;
        }
    });

    _hndlbar.registerHelper('class_head', function(row) {
        var columns = "";

        if (params.psngrtype == "student") {
            if (params.format == "pdf") {
                columns = "<h3 " + font10 + ">Class : " + attndhead[0].classname + "</h3>";
            } else {
                columns = "<h3 " + font13 + ">Class : " + attndhead[0].classname + "</h3>";
            }
        } else {
            columns = "";
        }

        return columns;
    });

    _hndlbar.registerHelper('psngr_value', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < psngrcolumn.length; i++) {
            data = row[psngrcolumn[i].val];

            if (params.format == "pdf") {
                columns = columns + '<td ' + font07 + ' class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>';
            } else {
                columns = columns + '<td ' + font12 + ' class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>';
            }
        }

        return columns;
    });

    _hndlbar.registerHelper('attnd_value', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < attndcolumn.length; i++) {
            data = row[attndcolumn[i].val];

            if (params.format == "pdf") {
                columns = columns + '<td ' + font07 + ' class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>';
            } else {
                columns = columns + '<td ' + font12 + ' class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>';
            }
        }

        return columns;
    });

    return _hndlbar;
}