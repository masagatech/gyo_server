var global = module.exports = {};

global.globvar = {
    "rootAPI": "/goyoapi",
}

global.schema = function schema(params) {
    return "sch." + params;
};

global.constr = function constr() {
    //return 'postgres://postgres:123@192.168.1.107:5432/goyo_marketing';
    return 'postgres://postgres:sa@123@localhost:5432/goyo_marketing';
};

global.monconstr = function constr() {
    //return 'postgres://postgres:123@192.168.1.107:5432/goyo_marketing';
    return 'mongodb://localhost:27017/goyosch';
};