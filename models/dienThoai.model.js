const mysql = require("mysql");
const mysqlConf = require("./../mysqlConf");

module.exports = {
  updateSetHDB_MAWhereDT_IMEI: (HDB_MA, DT_IMEI) => {
    let con = mysql.createConnection(mysqlConf);
    con.query(
      `UPDATE DIEN_THOAI SET HDB_MA = '${HDB_MA}' WHERE DT_IMEI = '${DT_IMEI}'`,
      (err, field) => {
        con.destroy();
        callback(err, field);
      }
    );
  },

  get: (callback) => {
    let con = mysql.createConnection(mysqlConf);
    con.query(`SELECT * FROM DIEN_THOAI`, (err, field) => {
      con.destroy();
      callback(err, field);
    });
  },
};
