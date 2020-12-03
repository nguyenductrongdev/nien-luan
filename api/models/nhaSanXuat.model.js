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
        let { NSX_MA, NSX_TEN } = data;
        let con = mysql.createConnection(config);
        con.query(
            `INSERT INTO NHA_SAN_XUAT(NSX_MA, NSX_TEN) VALUES('${NSX_MA}', '${NSX_TEN}'`,
            (err, field) => {
                con.destroy();
                callback(err, field);
            }
        );
    }
}