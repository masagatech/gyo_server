var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var dashboard = require("../appmodule/erp/dashboard.js");
var common = require("../appmodule/erp/common.js");
var emp = require("../appmodule/erp/employee.js");
var attnd = require("../appmodule/erp/attendance.js");
var leave = require("../appmodule/erp/leave.js");
var cls = require("../appmodule/erp/class.js");
var fees = require("../appmodule/erp/fees.js");
var acdmc = require("../appmodule/erp/academicyear.js");
var clssch = require("../appmodule/erp/classschedule.js");
var book = require("../appmodule/erp/books.js");
var submaptchr = require("../appmodule/erp/submaptchr.js");
var actv = require("../appmodule/erp/activity.js");
var ass = require("../appmodule/erp/assesment.js");
var assnm = require("../appmodule/erp/assignment.js");
var ntf = require("../appmodule/erp/notification.js");
var annc = require("../appmodule/erp/announcement.js");
var tag = require("../appmodule/erp/tag.js");
var gallery = require("../appmodule/erp/gallery.js");

const root = globals.globvar.rootAPI + "/erp";

var appRouter = function(app) {
    //##################################### VIVEK #####################################################


    //##################################### Dashboard ####################################################

    app.post(root + "/getERPDashboard", dashboard.getERPDashboard);

    //##################################### Dashboard ####################################################

    //##################################### Common ####################################################

    app.get(root + "/getAutoData", common.getAutoData);

    //##################################### Common ####################################################

    //##################################### Employee ###############################################

    app.post(root + "/saveEmployeeInfo", emp.saveEmployeeInfo);
    app.post(root + "/getEmployeeDetails", emp.getEmployeeDetails);

    //##################################### Employee ###############################################

    //##################################### Attendance ###############################################

    app.post(root + "/saveAttendance", attnd.saveAttendance);
    app.post(root + "/getAttendance", attnd.getAttendance);

    //##################################### Attendance ###############################################

    //##################################### Leave ###############################################

    app.post(root + "/getTeacherLeave", leave.getTeacherLeave);

    //##################################### Leave ###############################################

    //##################################### Class ###############################################

    app.post(root + "/saveClassInfo", cls.saveClassInfo);
    app.post(root + "/getClassDetails", cls.getClassDetails);

    //##################################### Class ###############################################

    //##################################### Fees ###############################################

    app.post(root + "/saveClassFees", fees.saveClassFees);
    app.post(root + "/getClassFees", fees.getClassFees);

    app.post(root + "/saveStudentFees", fees.saveStudentFees);
    app.post(root + "/getStudentFees", fees.getStudentFees);

    //##################################### Class ###############################################

    //##################################### Academic Year ###############################################

    app.post(root + "/saveAcademicYear", acdmc.saveAcademicYear);
    app.post(root + "/getAcademicYear", acdmc.getAcademicYear);

    //##################################### Academic Year ###############################################

    //##################################### Class Schedule ###############################################

    app.post(root + "/saveClassSchedule", clssch.saveClassSchedule);
    app.post(root + "/getClassSchedule", clssch.getClassSchedule);

    app.post(root + "/saveTimeTable", clssch.saveTimeTable);

    //##################################### Class Schedule ###############################################

    //##################################### Books ###############################################

    app.post(root + "/saveBooksInfo", book.saveBooksInfo);
    app.post(root + "/getBooksDetails", book.getBooksDetails);

    //##################################### Books ###############################################

    //##################################### Subject Map To Teacher ###############################################

    app.post(root + "/saveSubjectMapToTeacher", submaptchr.saveSubjectMapToTeacher);
    app.post(root + "/getSubjectMapToTeacher", submaptchr.getSubjectMapToTeacher);

    //##################################### Subject Map To Teacher ###############################################

    //##################################### Activity ###############################################

    app.post(root + "/saveActivityInfo", actv.saveActivityInfo);
    app.post(root + "/getActivityDetails", actv.getActivityDetails);

    //##################################### Activity ###############################################

    //##################################### Assesment ###############################################

    app.post(root + "/saveAssesmentInfo", ass.saveAssesmentInfo);
    app.post(root + "/getAssesmentDetails", ass.getAssesmentDetails);

    app.post(root + "/saveAssesmentResult", ass.saveAssesmentResult);
    app.post(root + "/getAssesmentResult", ass.getAssesmentResult);

    //##################################### Assesment #################################################

    //##################################### Assignment ###############################################

    app.post(root + "/saveAssignmentInfo", assnm.saveAssignmentInfo);
    app.post(root + "/getAssignmentDetails", assnm.getAssignmentDetails);

    //##################################### Assignment #################################################

    //##################################### Notification ###############################################

    app.post(root + "/saveNotification", ntf.saveNotification);
    app.post(root + "/getNotification", ntf.getNotification);

    //##################################### Notification ###############################################

    //##################################### Announcement ###############################################

    app.post(root + "/saveAnnouncement", annc.saveAnnouncement);
    app.post(root + "/getAnnouncement", annc.getAnnouncement);

    //##################################### Announcement ###############################################

    //##################################### Tag ###############################################

    app.post(root + "/saveTagInfo", tag.saveTagInfo);
    app.post(root + "/getTagDetails", tag.getTagDetails);

    app.post(root + "/saveTagGroupModuleMap", tag.saveTagGroupModuleMap);
    app.post(root + "/getTagGroupModuleMap", tag.getTagGroupModuleMap);

    //##################################### Tag ###############################################

    //##################################### Album ######################################################

    app.post(root + "/saveAlbumInfo", gallery.saveAlbumInfo);
    app.post(root + "/getAlbumDetails", gallery.getAlbumDetails);

    app.post(root + "/getGalleryDetails", gallery.getGalleryDetails);

    //##################################### Album ######################################################


    //##################################### VIVEK ######################################################
}

module.exports = appRouter;