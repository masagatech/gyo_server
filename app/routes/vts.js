var globals = require("gen").globals;
var vts = require("../appmodule/vts/vts.js");

const root = "/vts";

var appVTSRouter = function(app) {
    // Get Fence
    app.get(root + "/fnc", vts.getFence);
}

module.exports = appVTSRouter;