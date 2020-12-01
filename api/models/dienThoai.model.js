const mysql = require('mysql');

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "nienluan",
    multipleStatements: true
}

module.exports = {
    insert: (data, callback) => {
        let { LDT_MA, DT_IMEI, HDB_MA } = data;
        let con = mysql.createConnection(config);
        let sql = HDB_MA ?
            `INSERT INTO DIEN_THOAI(LDT_MA, DT_IMEI, HDB_MA) 
                VALUES('${LDT_MA}', '${DT_IMEI}', '${HDB_MA}')` :
            `INSERT INTO DIEN_THOAI(LDT_MA, DT_IMEI, HDB_MA) 
                VALUES('${LDT_MA}', '${DT_IMEI}', null)`;
        con.query(
            sql,
            (err) => {
                callback(err);
            }
        );
    },
}