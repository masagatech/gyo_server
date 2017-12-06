var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var fs = require('fs');
var common = module.exports = {};

const sendmail = require('sendmail')();

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

common.getDashboard = function getDashboard(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_dashboard") + "($1,$2::json);", ['db', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

common.getDropDownData = function getDropDownData(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_dropdown") + "($1,$2::json);", ['db', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Send Email

common.sendEmail = function sendEmail() {
    sendmail({
        from: 'vivek.pandey5188@gmail.com',
        to: 'pandey.vivek5188@gmail.com',
        subject: 'test sendmail',
        html: 'Mail of test sendmail',
    }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
}