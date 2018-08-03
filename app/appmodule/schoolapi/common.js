var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var fs = require('fs');
var common = module.exports = {};

const sendmail = require('sendmail')();

common.checkDuplicates = function checkDuplicates(arr, justCheck) {
    var len = arr.length,
        tmp = {},
        arrtmp = arr.slice(),
        dupes = [];

    arrtmp.sort();

    while (len--) {
        var val = arrtmp[len];

        if (/nul|nan|infini/i.test(String(val))) {
            val = String(val);
        }

        if (tmp[JSON.stringify(val)]) {
            if (justCheck) { return true; }
            dupes.push(val);
        }

        tmp[JSON.stringify(val)] = true;
    }

    return justCheck ? false : dupes.length ? dupes : null;
}

common.getAppVersion = function getAppVersion(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_appversion") + "($1,$2::json);", ['auto', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

common.getAutoData = function getAutoData(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_auto") + "($1,$2::json);", ['auto', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

common.getMOM = function getMOM(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_mom") + "($1,$2::json);", ['mom', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

common.saveMOM = function saveMOM(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_mom") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

common.getDropDownData = function getDropDownData(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_dropdown") + "($1,$2::json);", ['db', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// SMS / Email

common.getEmailSMS_Setting = function getEmailSMS_Setting(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_emailsms_setting") + "($1,$2::json);", ['es', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}