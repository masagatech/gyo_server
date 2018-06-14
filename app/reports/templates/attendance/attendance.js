var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

var handlebars = require('handlebars');
var groupBy = require('handlebars-group-by');

groupBy.register(handlebars);

reports.getStudentAttendanceReports = function getStudentAttendanceReports(data) {
    var _hndlbar = Handlebars;
    var attndhead = data.attndhead;
    var psngrcolumn = data.psngrcolumn;
    var allattndcolumn = data.allattndcolumn;
    var attndcolumn = data.attndcolumn;

    var classwiseattnd = data.classwiseattnd;
    var studentwiseattnd = data.studentwiseattnd;
    var params = data.params;

    var font07 = 'style = "font-size: 7px!important;"';
    var font10 = 'style = "font-size: 10px!important;"';
    var font12 = 'style = "font-size: 12px!important;"';
    var font13 = 'style = "font-size: 13px!important;"';
    var font18 = 'style = "font-size: 18px!important;"';

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

    // Get Class Name For Class Attendance Reports

    _hndlbar.registerHelper('attndclass', function(clshead) {
        var _clshead = clshead.split("~");
        var _attndclass = _clshead[0];

        return _attndclass;
    });

    // Get Total Studer By Class For Class Attendance Reports

    _hndlbar.registerHelper('attndstud', function(clshead) {
        var _clshead = clshead.split("~");
        var _attndstud = _clshead[1];

        return _attndstud;
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

    for (let index = 0; index < classwiseattnd.length; index++) {
        const element = classwiseattnd[index];

        var sb_array = studentwiseattnd.filter(function(x) { return x.classid == element.classid })
        element["sbarray"] = sb_array;
    }

    var font07 = 'style = "font-size: 7px!important;"';
    var font10 = 'style = "font-size: 10px!important;"';
    var font12 = 'style = "font-size: 12px!important;"';
    var font13 = 'style = "font-size: 13px!important;"';
    var font18 = 'style = "font-size: 18px!important;"';

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

    _hndlbar.registerHelper('attnddata', function(row, options) {
        var array = studentwiseattnd.filter(function(x) { return x.classid == row.classid });
        return array;
    });

    // Hide When

    _hndlbar.registerHelper('isvis', function(options) {
        if (params.psngrtype == "student") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // Group Column Name

    _hndlbar.registerHelper('groupcolname', function(row) {
        var _columns = "";
        var _colspan = 0;

        if (row != "") {
            if (params.attndmonth == "") {
                _colspan = 68;
            } else {
                _colspan = parseInt(row.split('~')[1]) + 3;
            }

            _columns += '<th colspan="' + _colspan + '"><b>Class : </b>' + row.split('~')[0] + '</th>';
        }

        return _columns;
    });

    // Split Head

    _hndlbar.registerHelper('splitHead', function(head, attndmonth) {
        if (params.attndmonth == "") {
            var _head = head.split("-");
            var _status = _head[1];

            var _statuslink = "";

            if (_status == "P" || _status == "A") {
                var flag = _status == "P" ? "average" : "studwiseattnd";

                _statuslink = '<a href="' + globals.reporturl + '/getStudentAttendanceReports?flag=' + flag + '&type=download&status=' + _status +
                    '&psngrtype=' + params.psngrtype + '&attndmonth=' + attndmonth + '&attndtype=' + params.attndtype + '&ayid=' + params.ayid +
                    '&classid=0&gender=' + params.gender + '&enttid=' + params.enttid + '&wsautoid=' + params.wsautoid +
                    '&uid=' + params.uid + '&utype=' + params.utype + '&issysadmin=' + params.issysadmin + '&format=pdf" target="_blank">' +
                    _status +
                    '</a>';
            } else {
                _statuslink = _status;
            }

            return _statuslink;
        } else {
            return head;
        }
    });

    // Get Class Head

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

    // Get Passenger Column Data

    _hndlbar.registerHelper('psngr_value', function(row) {
        var _columns = '';
        var _data = '';
        var _class = '';

        for (var i = 0; i < psngrcolumn.length; i++) {
            _data = row[psngrcolumn[i].key];
            _columns = _columns + '<td align="center" ' + font07 + '>' + (_data == null ? '-' : _data) + '</td>';
        }

        return _columns;
    });

    // Get Attendance Column Data

    _hndlbar.registerHelper('attnd_value', function(row) {
        var _columns = '';
        var _data = '';
        var _class = '';

        for (var i = 0; i < allattndcolumn.length; i++) {
            var attndmonth = allattndcolumn[i].attndmonth;
            var status = allattndcolumn[i].day.split('-')[1];
            var flag = status == "P" ? "average" : "studwiseattnd";

            if (params.attndmonth == "") {
                _class = status;
            } else {
                _class = row[allattndcolumn[i].day];
            }

            _data = row[allattndcolumn[i].day];

            if (_data == 0 || _data == null || _data == "P" || _data == "A" || _data == "LV" || _data == "WO" || _data == "H" || status == "LV" || status == "WO" || status == "H") {
                _columns = _columns + '<th align="center" ' + font07 + ' class="' + _class + '">' + (_data == null ? '-' : _data) + '</th>';
            } else {
                _columns = _columns + '<th align="center" ' + font07 + ' class="' + _class + '">' +
                    '<a href="' + globals.reporturl + '/getStudentAttendanceReports?flag=' + flag + '&type=download&status=' + status +
                    '&psngrtype=' + params.psngrtype + '&attndmonth=' + attndmonth + '&attndtype=' + params.attndtype + '&ayid=' + params.ayid +
                    '&classid=' + row.classid + '&gender=' + params.gender + '&enttid=' + params.enttid + '&wsautoid=' + params.wsautoid +
                    '&uid=' + params.uid + '&utype=' + params.utype + '&issysadmin=' + params.issysadmin + '&format=pdf" target="_blank">' +
                    (_data == null ? '-' : _data) +
                    '</a></th>';
            }
        }

        return _columns;
    });

    return _hndlbar;
}