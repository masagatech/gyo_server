var reportPath = "../reports/apis/";
var reportsapi = "../appmodule/reportsapi/";

// report modules

var reports = require(reportsapi + "reports.js");
var notification = require(reportsapi + "notification.js");
var announcement = require(reportsapi + "announcement.js");
var exam = require(reportsapi + "exam.js");

module.exports = function(app) {
    app.get("/getReports", reports.getReports);

    app.get("/getNotification", notification.getNotification);
    app.get("/getAnnouncement", announcement.getAnnouncement);

    app.get("/downloadExamResult", exam.downloadExamResult);
}