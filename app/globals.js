var global = module.exports = {};

global.globvar = {
    "rootAPI": "/goyoapi",
    "marketapi": "/marketapi"
}

global.schema = function schema(params) {
    return "ginv." + params;
};

global.schema2 = function schema2(params) {
    return "mrktn." + params;
};

global.constr = function constr() {
    //return 'postgres://postgres:123@192.168.1.107:5432/goyo_marketing';
    return 'postgres://postgres:123@192.168.1.105:5432/goyo_sch';
};

global.monconstr = function constr() {
    //return 'postgres://postgres:123@192.168.1.107:5432/goyo_marketing';
    return 'mongodb://127.0.0.1:27017/goyosch';
};