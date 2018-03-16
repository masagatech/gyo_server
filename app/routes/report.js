var reportPath = "../reports/apis/";
var erpapiPath = "../appmodule/erp/";

// report modules

var exam = require(erpapiPath + "exam.js");

module.exports = function(app) {
    app.get("/downloadExamResult", exam.downloadExamResult);
}