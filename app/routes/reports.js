var reportPath = "../reports/apis/";
var reportsapi = "../appmodule/reportsapi/";

// report modules

var reports = require(reportsapi + "reports.js");
var exam = require(reportsapi + "exam.js");

module.exports = function(app) {
    app.get("/getReports", reports.getReports);

    app.get("/downloadExamResult", exam.downloadExamResult);
}