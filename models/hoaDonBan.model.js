const mysql = require("mysql");
const mysqlConf = require("./../mysqlConf");

module.exports = {
  get: (data, callback) => {
    let con = mysql.createConnection(mysqlConf);
    let { date = "%", month = "%", year = "%" } = data;
    con.query(
      `SELECT 
                * 
            FROM 
                HOA_DON_BAN, DIEN_THOAI, LOAI_DIEN_THOAI
            WHERE 
                HOA_DON_BAN.HDB_MA = DIEN_THOAI.HDB_MA
                AND DIEN_THOAI.LDT_MA = LOAI_DIEN_THOAI.LDT_MA
                AND HOA_DON_BAN.HDB_THOI_GIAN LIKE '${year}-${month}-${date}'`,
      (err, field) => {
        // console.log(field);
        callback(err, field);
      }
    );
  },

  insert: (data, callback) => {
    let { HDB_MA, ND_TEN_DANG_NHAP, HDB_THOI_GIAN } = data;
    let con = mysql.createConnection(mysqlConf);
    con.query(
      `INSERT INTO HOA_DON_BAN(HDB_MA, ND_TEN_DANG_NHAP, HDB_THOI_GIAN) 
                VALUES('${HDB_MA}', '${ND_TEN_DANG_NHAP}', '${HDB_THOI_GIAN}')`,
      (err, field) => {
        con.destroy();
        callback(err, field);
      }
    );
  },
};
