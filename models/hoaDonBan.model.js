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
        let {
            HDB_MA,
            ND_TEN_DANG_NHAP,
            HDB_THOI_GIAN
        } = data;
        let con = mysql.createConnection(config);
        con.query(
            `INSERT INTO HOA_DON_BAN(HDB_MA, ND_TEN_DANG_NHAP, HDB_THOI_GIAN) 
                VALUES('${HDB_MA}', '${ND_TEN_DANG_NHAP}', '${HDB_THOI_GIAN}')`,
            (err, field) => {
                con.destroy();
                callback(err, field);
            }
        );
    }
}