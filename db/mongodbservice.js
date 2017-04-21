var mongoose = require('mongoose');

var globals = require("../globals.js");

var mondb = module.exports = {};

mondb.mongoose = mongoose;

mondb.constr = globals.monconstr();

mondb.connected = false;

mondb.start = function connect() {
    mongoose.connect(mondb.constr);
}