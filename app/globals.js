var global = module.exports = {};

global.globvar = {
    "rootAPI": "/goyoapi",
    "marketapi": "/marketapi"
}

global.schema = function schema(params) {
    return "ginv." + params;
};

global.erpschema = function erpschema(params) {
    return "erp." + params;
};

global.schema2 = function schema2(params) {
    return "mrktn." + params;
};

global.constr = function constr() {
    // return 'postgres://postgres:sa@123@35.154.230.244:5432/goyo_app';

    return 'postgres://postgres:123@192.168.1.108:5432/goyo_school';
};

global.monconstr = function constr() {
    //return 'postgres://postgres:123@192.168.1.107:5432/goyo_marketing';
    return 'mongodb://127.0.0.1:27017/goyosch';
};

// global.pgdbconnection = {
//     user: 'postgres', //env var: PGUSER
//     database: 'goyo_school', //env var: PGDATABASE
//     password: '123', //env var: PGPASSWORD
//     host: 'localhost', // Server hosting the postgres database
//     port: 5432, //env var: PGPORT
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// };


global.pgdbconnection = {
    user: 'postgres', //env var: PGUSER
    database: 'goyo_school', //env var: PGDATABASE
    password: '123', //env var: PGPASSWORD
    host: '192.168.1.108', // Server hosting the postgres database
    // host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// global.pgdbconnection = {
//     user: 'postgres', //env var: PGUSER
//     database: 'goyo_app', //env var: PGDATABASE
//     password: 'sa@123', //env var: PGPASSWORD
//     host: '35.154.230.244', // Server hosting the postgres database
//     port: 5432, //env var: PGPORT
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// };