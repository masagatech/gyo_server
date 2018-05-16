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

    _hndlbar.registerHelper('class_head', function(row) {
        var columns = "";

        if (params.psngrtype == "student") {
            columns = "<h4>Class : " + attndhead[0].classname + "</h4>";
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
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>'
        }

        return columns;
    });

    _hndlbar.registerHelper('attnd_value', function(row) {
        var columns = '';
        let data = '';

        for (var i = 0; i < attndcolumn.length; i++) {
            data = row[attndcolumn[i].val];
            columns = columns + '<td class="' + data + '" align="center">' + (data == null ? '-' : data) + '</td>'
        }

        return columns;
    });

    return _hndlbar;
}