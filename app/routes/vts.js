var globals = require("gen").globals;
var vts = require("../appmodule/vts/vts.js");

const root = "/vts";

var appVTSRouter = function(app) {
    // Get Fence
    app.get(root + "/fnc", vts.getFence);

    // Get Speed
    app.get(root + "/speed", vts.getSpeed);
}

module.exports = appVTSRouter;