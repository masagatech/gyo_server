var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var audit = require("../appmodule/erp/auditlog.js");
var dashboard = require("../appmodule/erp/dashboard.js");
var common = require("../appmodule/erp/common.js");
var emp = require("../appmodule/erp/employee.js");
var prspct = require("../appmodule/erp/prospectus.js");
var admsn = require("../appmodule/erp/admission.js");
var attnd = require("../appmodule/erp/attendance.js");
var cls = require("../appmodule/erp/class.js");
var sub = require("../appmodule/erp/subject.js");
var fees = require("../appmodule/erp/fees.js");
var acdmc = require("../appmodule/erp/academicyear.js");
var clstmt = require("../appmodule/erp/classtimetable.js");
var book = require("../appmodule/erp/books.js");
var chapter = require("../appmodule/erp/chapter.js");
var submaptchr = require("../appmodule/erp/submaptchr.js");
var actv = require("../appmodule/erp/activity.js");
var ass = require("../appmodule/erp/assesment.js");
var exam = require("../appmodule/erp/exam.js");
var assnm = require("../appmodule/erp/assignment.js");
var ntf = require("../appmodule/erp/notification.js");
var annc = require("../appmodule/erp/announcement.js");
var nb = require("../appmodule/erp/noticeboard.js");
var tag = require("../appmodule/erp/tag.js");
var gallery = require("../appmodule/erp/gallery.js");
var content = require("../appmodule/erp/content.js");
var smspack = require("../appmodule/erp/smspack.js");
var library = require("../appmodule/erp/library.js");
var trips = require("../appmodule/erp/trips.js");

const root = globals.globvar.rootAPI + "/erp";

var multer = require('multer');

var appRouter = function(app) {
    //##################################### VIVEK ########################################################


    //##################################### Audit Log ###################################################

    app.post(root + "/saveAuditLog", audit.saveAuditLog);
    app.post(root + "/getAuditLog", audit.getAuditLog);

    //##################################### Audit Log ###################################################

    //##################################### Dashboard ####################################################

    app.post(root + "/getERPDashboard", dashboard.getERPDashboard);
    app.post(root + "/getStudentDashboard", dashboard.getStudentDashboard);

    //##################################### Dashboard ####################################################

    //##################################### Common #######################################################

    app.get(root + "/getAutoData", common.getAutoData);

    //##################################### Common #######################################################

    //##################################### Prospectus ###################################################

    app.post(root + "/saveProspectusInfo", prspct.saveProspectusInfo);
    app.post(root + "/getProspectusDetails", prspct.getProspectusDetails);

    //##################################### Prospectus ###################################################

    //##################################### Prospectus Issued ############################################

    app.post(root + "/saveProspectusIssued", prspct.saveProspectusIssued);
    app.post(root + "/getProspectusIssued", prspct.getProspectusIssued);

    //##################################### Prospectus Issued ############################################

    //##################################### Admission ####################################################

    app.post(root + "/saveAdmissionInfo", admsn.saveAdmissionInfo);
    app.post(globals.globvar.rootAPI + "/saveStudentInfo", admsn.saveStudentInfo);
    app.post(globals.globvar.rootAPI + "/saveStudentVehicleMap", admsn.saveStudentVehicleMap);
    app.post(globals.globvar.rootAPI + "/saveStudentRollover", admsn.saveStudentRollover);

    app.post(globals.globvar.rootAPI + "/getStudentDetails", admsn.getStudentDetails);
    app.post(globals.globvar.rootAPI + "/viewStudentDetails", admsn.viewStudentDetails);

    //##################################### Admisssion ###################################################

    //##################################### Employee #####################################################

    app.post(root + "/saveEmployeeInfo", emp.saveEmployeeInfo);
    app.post(root + "/getEmployeeDetails", emp.getEmployeeDetails);

    //##################################### Employee #####################################################

    //##################################### Attendance ###################################################

    app.post(root + "/saveAttendance", attnd.saveAttendance);
    app.post(root + "/getAttendance", attnd.getAttendance);

    //##################################### Attendance ###################################################

    //##################################### Class ########################################################

    app.post(root + "/saveClassInfo", cls.saveClassInfo);
    app.post(root + "/getClassDetails", cls.getClassDetails);

    //##################################### Class ########################################################

    //##################################### Subject ########################################################

    app.post(root + "/saveSubjectInfo", sub.saveSubjectInfo);
    app.post(root + "/getSubjectDetails", sub.getSubjectDetails);

    //##################################### Subject ########################################################

    //##################################### Fees #########################################################

    app.post(root + "/saveClassFees", fees.saveClassFees);
    app.post(root + "/getClassFees", fees.getClassFees);

    app.post(root + "/saveFeesCollection", fees.saveFeesCollection);
    app.post(root + "/getFeesCollection", fees.getFeesCollection);
    app.post(root + "/getFeesReports", fees.getFeesReports);

    //##################################### Class ########################################################

    //##################################### Academic Year ################################################

    app.post(root + "/saveAcademicYear", acdmc.saveAcademicYear);
    app.post(root + "/getAcademicYear", acdmc.getAcademicYear);

    //##################################### Academic Year ################################################

    //##################################### Class TimeTable ##############################################

    app.post(root + "/saveClassTimeTable", clstmt.saveClassTimeTable);
    app.post(root + "/getClassTimeTable", clstmt.getClassTimeTable);

    app.post(root + "/saveTimeTable", clstmt.saveTimeTable);
    app.post(root + "/getTimeTable", clstmt.getTimeTable);

    //##################################### Class TimeTable ##############################################

    //##################################### Books ########################################################

    app.post(root + "/saveBooksInfo", book.saveBooksInfo);
    app.post(root + "/getBooksDetails", book.getBooksDetails);

    //##################################### Books ########################################################

    //##################################### Chapter ######################################################

    app.post(root + "/saveChapterInfo", chapter.saveChapterInfo);
    app.post(root + "/getChapterDetails", chapter.getChapterDetails);

    //##################################### Chapter ######################################################

    //##################################### Subject Map To Teacher #######################################

    app.post(root + "/saveSubjectMapToTeacher", submaptchr.saveSubjectMapToTeacher);
    app.post(root + "/getSubjectMapToTeacher", submaptchr.getSubjectMapToTeacher);

    //##################################### Subject Map To Teacher #######################################

    //##################################### Activity #####################################################

    app.post(root + "/saveActivityInfo", actv.saveActivityInfo);
    app.post(root + "/getActivityDetails", actv.getActivityDetails);

    //##################################### Activity #####################################################

    //##################################### Assesment ####################################################

    app.post(root + "/saveAssesmentInfo", ass.saveAssesmentInfo);
    app.post(root + "/getAssesmentDetails", ass.getAssesmentDetails);

    app.post(root + "/saveAssesmentResult", ass.saveAssesmentResult);
    app.post(root + "/getAssesmentResult", ass.getAssesmentResult);
    app.post(root + "/getAssesmentResultReports", ass.getAssesmentResultReports);

    //##################################### Assesment ####################################################

    //##################################### Exam #########################################################

    app.post(root + "/saveExamInfo", exam.saveExamInfo);
    app.post(root + "/getExamDetails", exam.getExamDetails);

    app.post(root + "/saveExamResult", exam.saveExamResult);
    app.post(root + "/getExamResult", exam.getExamResult);

    //##################################### Exam #########################################################

    //##################################### Assignment ###################################################

    app.post(root + "/saveAssignmentInfo", assnm.saveAssignmentInfo);
    app.post(root + "/getAssignmentDetails", assnm.getAssignmentDetails);

    app.post(root + "/saveTeacherRemark", assnm.saveTeacherRemark);
    app.post(root + "/getTeacherRemark", assnm.getTeacherRemark);

    //##################################### Assignment ###################################################

    //##################################### Notification #################################################

    app.post(root + "/saveNotification", ntf.saveNotification);
    app.post(root + "/getNotification", ntf.getNotification);

    //##################################### Notification #################################################

    //##################################### Announcement #################################################

    app.post(root + "/saveAnnouncement", annc.saveAnnouncement);
    app.post(root + "/getAnnouncement", annc.getAnnouncement);

    //##################################### Announcement #################################################

    //##################################### Noticeboard #################################################

    app.post(root + "/saveNoticeboard", nb.saveNoticeboard);
    app.post(root + "/getNoticeboard", nb.getNoticeboard);

    //##################################### Noticeboard #################################################

    //##################################### Tag ##########################################################

    app.post(root + "/saveTagInfo", tag.saveTagInfo);
    app.post(root + "/getTagDetails", tag.getTagDetails);

    app.post(root + "/saveTagGroupModuleMap", tag.saveTagGroupModuleMap);
    app.post(root + "/getTagGroupModuleMap", tag.getTagGroupModuleMap);

    //##################################### Tag ##########################################################

    //##################################### Album ########################################################

    app.post(root + "/saveAlbumInfo", gallery.saveAlbumInfo);
    app.post(root + "/getAlbumDetails", gallery.getAlbumDetails);

    app.post(root + "/getGalleryDetails", gallery.getGalleryDetails);

    //##################################### Album ########################################################

    //##################################### Content ######################################################

    app.post(root + "/getContentDetails", content.getContentDetails);

    app.post(root + "/saveContentInfo", content.saveContentInfo);
    app.post(root + "/saveContentDetails", content.saveContentDetails);
    app.post(root + "/saveContentEntityMap", content.saveContentEntityMap);

    //##################################### Content ######################################################

    //##################################### smspack ######################################################

    app.post(root + "/getSMSPack", smspack.getSMSPack);
    app.post(root + "/saveSMSPack", smspack.saveSMSPack);

    //##################################### Content ######################################################

    //##################################### Library ######################################################

    app.post(root + "/getLibraryDetails", library.getLibraryDetails);
    app.post(root + "/getLibraryBooks", library.getLibraryBooks);
    app.post(root + "/getLibraryBookIssued", library.getLibraryBookIssued);

    app.post(root + "/saveLibraryInfo", library.saveLibraryInfo);
    app.post(root + "/saveLibraryBooks", library.saveLibraryBooks);
    app.post(root + "/saveLibraryBookIssued", library.saveLibraryBookIssued);
    app.post(root + "/saveLibraryBookReturn", library.saveLibraryBookReturn);

    //##################################### Library ######################################################

    //##################################### TRIP API #####################################################

    app.post(root + "/tripapi/start", trips.starttrip);
    app.post(root + "/tripapi/stop", trips.stoptrip);
    app.get(root + "/tripapi/getEmpStatus", trips.getEmpStatus);
    app.post(root + "/tripapi/getEmpStatus", trips.getEmpStatus);

    //##################################### TRIP API #####################################################

    //##################################### VIVEK ########################################################
}

module.exports = appRouter;