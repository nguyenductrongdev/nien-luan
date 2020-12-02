const mysql = require('mysql');

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "nienluan",
    multipleStatements: true
}

module.exports = {
    updateSetHDB_MAWhereDT_IMEI: (HDB_MA, DT_IMEI) => {
        let con = mysql.createConnection(config);
        con.query(`UPDATE DIEN_THOAI SET HDB_MA = '${HDB_MA}' WHERE DT_IMEI = '${DT_IMEI}'`, (err, field) => {
            con.destroy();
            callback(err, field)
        });
    },

    get: (callback) => {
        let con = mysql.createConnection(config);
        con.query(`SELECT * FROM DIEN_THOAI`, (err, field) => {
            con.destroy();
            callback(err, field);
        });
    }
}