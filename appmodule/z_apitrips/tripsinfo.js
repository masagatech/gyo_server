var mondb = require("../../db/mongodbservice.js");
var rs = require("../util/resp.js");
var globals = require("../../globals.js");
var mg_model_tripinfo = require("../../mg_model/tripinfo.js");

var tripsinfo = module.exports = {};

tripsinfo.createtripdetails = function(req, res, done) {
    try {
        mondb.mongoose.model('tripdetails').create(req.body.trp_d, function(err, data) {
            if (err) {
                //console.log(err);
                rs.resp(res, 400, err);
                return;
            }
            //console.log(data);
            rs.resp(res, 200, data._id);
        });
    } catch (ex) {
        rs.resp(res, 400, ex.message);
        //console.error(ex.message);
    }
}