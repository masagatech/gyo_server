var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var certificate = module.exports = {};
var certificateapi = require("../../reports/templates/certificate/certificate.js");

// Student Certificate

certificate.getStudentCertificate = function getStudentCertificate(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_studentcertificate") + "($1,$2::json);", ['crtfct', req.query], function(data) {
        if (req.query.type == "download") {
            var formname = "";

            if (req.query.flag == "bonafied") {
                formname = "certificate/studbonafied.html";
            } else if (req.query.flag == "birth") {
                formname = "certificate/studbirth.html";
            } else if (req.query.flag == "trial") {
                formname = "certificate/studtrial.html";
            }

            download(req, res, {
                data: data.rows,
                params: req.query
            }, { 'all': formname }, certificateapi.getStudentCertificate);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}