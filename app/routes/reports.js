// report modules

var log = require("../appmodule/reportsapi/log.js");
var reports = require("../appmodule/reportsapi/reports.js");
var passenger = require("../appmodule/reportsapi/passenger.js");
var notification = require("../appmodule/reportsapi/notification.js");
var announcement = require("../appmodule/reportsapi/announcement.js");
var classtimetable = require("../appmodule/reportsapi/classtimetable.js");
var exam = require("../appmodule/reportsapi/exam.js");
var assesment = require("../appmodule/reportsapi/assesment.js");
var attnd = require("../appmodule/reportsapi/attendance.js");
var fees = require("../appmodule/reportsapi/fees.js");
var schedule = require("../appmodule/reportsapi/schedule.js");
var certificate = require("../appmodule/reportsapi/certificate.js");

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
    app.get("/getStudentAttendanceReports", attnd.getStudentAttendanceReports);

    // Fees Reports

    app.get("/getFeesReports", fees.getFeesReports);
    app.get("/getScheduleReports", schedule.getScheduleReports);

    // Student Certificate

    app.get("/getStudentCertificate", certificate.getStudentCertificate);
}