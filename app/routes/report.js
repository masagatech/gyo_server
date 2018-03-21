var reportPath = "../reports/apis/";
var schoolapiPath = "../appmodule/schoolapi/";
var erpapiPath = "../appmodule/erp/";

// report modules

var milege = require(schoolapiPath + "milege.js");
var exam = require(erpapiPath + "exam.js");

module.exports = function(app) {
    app.get("/getMilegeDetails", milege.getMilegeDetails);

    app.get("/downloadExamResult", exam.downloadExamResult);
}