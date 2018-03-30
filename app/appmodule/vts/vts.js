var mondb = require("../../db/mongodbservice.js");
var rs = require("gen").res;
var globals = require("gen").globals;
var datetime = require('node-datetime');


var vts = module.exports = {};

vts.getFence = function(req, res, done){

    console.log(req.query)
}