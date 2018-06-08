var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

var handlebars = require('handlebars');
var groupBy = require('handlebars-group-by');

groupBy.register(handlebars);

reports.getStudentAttendanceReports = function getStudentAttendanceReports(data) {
    var _hndlbar = Handlebars;

    _hndlbar.registerHelper('uploadurl', function(params) {
        return globals.uploadurl;
    });

    return _hndlbar;
}

reports.getAttendanceReports = function getAttendanceReports(data) {
    var _hndlbar = Handlebars;
    var attndhead = data.attndhead;
    var psngrcolumn = data.psngrcolumn;
    var allattndcolumn = data.allattndcolumn;
    var attndcolumn = data.attndcolumn;

    var classwiseattnd = data.classwiseattnd;
    var studentwiseattnd = data.studentwiseattnd;
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

    _hndlbar.registerHelper('uploadurl', function(params) {
        return globals.uploadurl;
    });

    _hndlbar.registerHelper('attnddata', function(row) {
        return studentwiseattnd.filter(function(x) { return x.classid == row.classid });
    });

    // Hide When

    _hndlbar.registerHelper('groupcolname', function(row) {
        var _columns = "";
        var _data = '';

        if (row != "") {
            if (params.attndmonth == "") {
                _columns += '<th colspan="68"><b>Class : </b>' + row + '</th>';
            } else {
                _columns += '<th colspan="39"><b>Class : </b>' + row + '</th>';
            }
        }

        return _columns;
    });

    _hndlbar.registerHelper('splitHead', function(head) {
        if (params.attndmonth == "") {
            var t = head.split("-");
            return t[1];
        } else {
            return head;
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
        var _columns = '';
        var _data = '';
        var _class = '';

        for (var i = 0; i < psngrcolumn.length; i++) {
            _data = row[psngrcolumn[i].key];
            _columns = _columns + '<td align="center">' + (_data == null ? '-' : _data) + '</td>';
        }

        return _columns;
    });

    _hndlbar.registerHelper('allattnd_value', function(row) {
        var _columns = '';
        var _data = '';
        var _class = '';

        for (var i = 0; i < allattndcolumn.length; i++) {
            var attndmonth = allattndcolumn[i].attndmonth;
            var status = allattndcolumn[i].day.split('-')[1];
            var flag = status == "P" ? "average" : "statuswise";

            if (params.attndmonth == "") {
                _class = status;
            } else {
                _class = row[allattndcolumn[i].day];
            }

            _data = row[allattndcolumn[i].day];

            if (_data == 0 || _data == null || status == "LV" || status == "WO" || status == "H") {
                _columns = _columns + '<td class="' + _class + '" align="center">' + (_data == null ? '-' : _data) + '</td>';
            } else {
                _columns = _columns + '<td class="' + _class + '" align="center">' +
                    '<a href="' + globals.reporturl + '/getStudentAttendanceReports?flag=' + flag + '&type=download&status=' + status +
                    '&psngrtype=' + params.psngrtype + '&attndmonth=' + attndmonth + '&attndtype=' + params.attndtype + '&ayid=' + params.ayid +
                    '&classid=' + row.classid + '&gender=' + params.gender + '&enttid=' + params.enttid + '&wsautoid=' + params.wsautoid +
                    '&uid=' + params.uid + '&utype=' + params.utype + '&issysadmin=' + params.issysadmin + '&format=pdf" target="_blank">' +
                    (_data == null ? '-' : _data) +
                    '</a></td>';
            }
        }

        return _columns;
    });

    _hndlbar.registerHelper('attnd_value', function(row) {
        var _columns = '';
        var _data = '';
        var _class = '';

        for (var i = 0; i < attndcolumn.length; i++) {
            if (params.attndmonth == "") {
                _class = attndcolumn[i].day.split('-')[1];
            } else {
                _class = row[attndcolumn[i].day];
            }

            _data = row[attndcolumn[i].day];
            _columns = _columns + '<td class="' + _class + '" align="center">' + (_data == null ? '-' : _data) + '</td>';
        }

        return _columns;
    });

    return _hndlbar;
}