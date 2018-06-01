var reportPath = "../reports/apis/";
var reportsapi = "../appmodule/reportsapi/";

// report modules

var log = require(reportsapi + "log.js");
var reports = require(reportsapi + "reports.js");
var passenger = require(reportsapi + "passenger.js");
var notification = require(reportsapi + "notification.js");
var announcement = require(reportsapi + "announcement.js");
var classtimetable = require(reportsapi + "classtimetable.js");
var exam = require(reportsapi + "exam.js");
var assesment = require(reportsapi + "assesment.js");
var attnd = require(reportsapi + "attendance.js");
var fees = require(reportsapi + "fees.js");

module.exports = function(app) {
    // Mileage and Speed Reports

    app.get("/getReports", reports.getReports);
    app.post("/postReports", reports.postReports);

    // Passenger Reports

    app.get("/getPassengerReports", passenger.getPassengerReports);

    // Log Reports

    app.get("/getLoginLogReports", log.getLoginLogReports);
    app.get("/getMenuLogReports", log.getMenuLogReports);
    app.get("/getAuditLogReports", log.getAuditLogReports);

    // Notification Reports

    app.get("/getNotification", notification.getNotification);
    app.get("/getAnnouncement", announcement.getAnnouncement);

    // TimeTable Reports

    app.get("/getClassTimeTablePeriod", classtimetable.getClassTimeTablePeriod);
    app.get("/getClassTimeTableMonthly", classtimetable.getClassTimeTableMonthly);
    app.get("/getClassTimeTableWeekly", classtimetable.getClassTimeTableWeekly);

    // Exam and Assesment Reports

    app.get("/downloadExamResult", exam.downloadExamResult);
    app.get("/getExamResultReports", exam.getExamResultReports);
    app.get("/getAssesmentResultReports", assesment.getAssesmentResultReports);

    // Attendance Reports

    app.get("/getAttendanceReports", attnd.getAttendanceReports);

    // Fees Reports

    app.get("/getFeesReports", fees.getFeesReports);
}