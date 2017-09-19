var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var common = require("../appmodule/erp/common.js");
var emp = require("../appmodule/erp/employee.js");
var cls = require("../appmodule/erp/class.js");
var acdmc = require("../appmodule/erp/academicyear.js");
var clsrst = require("../appmodule/erp/classroster.js");
var book = require("../appmodule/erp/books.js");
var actv = require("../appmodule/erp/activity.js");
var assnm = require("../appmodule/erp/assignment.js");
var ntf = require("../appmodule/erp/notification.js");
var annc = require("../appmodule/erp/announcement.js");

const root = globals.globvar.rootAPI + "/erp";

var appRouter = function(app) {
    //##################################### VIVEK #####################################################


    //##################################### Common ####################################################

    app.get(root + "/getAutoData", common.getAutoData);

    //##################################### Common ####################################################

    //##################################### Employee ###############################################

    app.post(root + "/saveEmployeeInfo", emp.saveEmployeeInfo);
    app.post(root + "/getEmployeeDetails", emp.getEmployeeDetails);

    //##################################### Employee ###############################################

    //##################################### Class ###############################################

    app.post(root + "/saveClassInfo", cls.saveClassInfo);
    app.post(root + "/getClassDetails", cls.getClassDetails);

    //##################################### Class ###############################################

    //##################################### Academic Year ###############################################

    app.post(root + "/saveAcademicYear", acdmc.saveAcademicYear);
    app.post(root + "/getAcademicYear", acdmc.getAcademicYear);

    //##################################### Academic Year ###############################################

    //##################################### Class Roster ###############################################

    app.post(root + "/saveClassRoster", clsrst.saveClassRoster);
    app.post(root + "/getClassRoster", clsrst.getClassRoster);

    app.post(root + "/saveTimeTable", clsrst.saveTimeTable);

    //##################################### Class Roster ###############################################

    //##################################### Books ###############################################

    app.post(root + "/saveBooksInfo", book.saveBooksInfo);
    app.post(root + "/getBooksDetails", book.getBooksDetails);

    //##################################### Books ###############################################

    //##################################### Activity ###############################################

    app.post(root + "/saveActivityInfo", actv.saveActivityInfo);
    app.post(root + "/getActivityDetails", actv.getActivityDetails);

    //##################################### Activity ###############################################

    //##################################### Assignment ###############################################

    app.post(root + "/saveAssignmentInfo", assnm.saveAssignmentInfo);
    app.post(root + "/getAssignmentDetails", assnm.getAssignmentDetails);

    //##################################### Assignment ###############################################

    //##################################### Notification ###############################################

    app.post(root + "/saveNotification", ntf.saveNotification);
    app.post(root + "/getNotification", ntf.getNotification);

    //##################################### Notification ###############################################

    //##################################### Announcement ###############################################

    app.post(root + "/saveAnnouncement", annc.saveAnnouncement);
    app.post(root + "/getAnnouncement", annc.getAnnouncement);

    //##################################### Announcement ###############################################


    //##################################### VIVEK ######################################################
}

module.exports = appRouter;