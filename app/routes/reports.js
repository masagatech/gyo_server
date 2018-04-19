var reportPath = "../reports/apis/";
var reportsapi = "../appmodule/reportsapi/";

// report modules

var log = require(reportsapi + "log.js");
var reports = require(reportsapi + "reports.js");
var notification = require(reportsapi + "notification.js");
var announcement = require(reportsapi + "announcement.js");
var classtimetable = require(reportsapi + "classtimetable.js");
var exam = require(reportsapi + "exam.js");
var assesment = require(reportsapi + "assesment.js");
var fees = require(reportsapi + "fees.js");

module.exports = function(app) {
    app.get("/getLoginLogReports", log.getLoginLogReports);

    app.get("/getReports", reports.getReports);

    app.get("/getNotification", notification.getNotification);
    app.get("/getAnnouncement", announcement.getAnnouncement);

    app.get("/getClassTimeTablePeriod", classtimetable.getClassTimeTablePeriod);
    app.get("/getClassTimeTableMonthly", classtimetable.getClassTimeTableMonthly);
    app.get("/getClassTimeTableWeekly", classtimetable.getClassTimeTableWeekly);

    app.get("/downloadExamResult", exam.downloadExamResult);
    app.get("/getExamResultReports", exam.getExamResultReports);

    app.get("/getAssesmentResultReports", assesment.getAssesmentResultReports);

    app.get("/getFeesReports", fees.getFeesReports);
}