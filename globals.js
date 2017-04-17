var global = module.exports = {};

global.globvar = {
    "rootAPI": "/goyoapi",
}

global.schema = function schema(params) {
    return "mrktn." + params;
};

global.constr = function constr() {
    return 'postgres://postgres:123@localhost:5432/goyo_marketing';
    //return 'postgres://postgres:sa@123@35.154.27.42:5432/goyo_marketing';
};