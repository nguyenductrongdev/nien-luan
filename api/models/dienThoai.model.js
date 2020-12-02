const mysql = require('mysql');

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "nienluan",
    multipleStatements: true
}

module.exports = {
    get: (callback) => {
        let con = mysql.createConnection(config);
        con.query(`SELECT * FROM DIEN_THOAI`, (err, field) => {
            con.destroy();
            callback(err, field);
        });
    },

    getByLDT_MA: (LDT_MA, callback) => {
        let con = mysql.createConnection(config);
        con.query(
            `SELECT
                DISTINCT LOAI_DIEN_THOAI.LDT_MA,
                LOAI_DIEN_THOAI.LDT_TEN,
                HINH_ANH.HA_URL,
                LOAI_DIEN_THOAI.LDT_GIA,
                IF(LOAI_DIEN_THOAI.CTKM_MA IS NULL, NULL, ROUND(CHUONG_TRINH_KHUYEN_MAI.CTKM_HE_SO, 3)) as CTKM_HE_SO
            FROM
                LOAI_DIEN_THOAI, CHUONG_TRINH_KHUYEN_MAI, HINH_ANH
            WHERE
                (LOAI_DIEN_THOAI.CTKM_MA = CHUONG_TRINH_KHUYEN_MAI.CTKM_MA
                OR LOAI_DIEN_THOAI.CTKM_MA IS NULL)
                AND HINH_ANH.LDT_MA = LOAI_DIEN_THOAI.LDT_MA
                AND LOAI_DIEN_THOAI.LDT_MA = '${LDT_MA}'`,
            (err, field) => {
                con.destroy();
                callback(err, field);
            }
        );
    },

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
                con.destroy();
                callback(err);
            }
        );
    },

    updateSetHDB_MAWhereDT_IMEI: (HDB_MA, DT_IMEI, callback) => {
        let con = mysql.createConnection(config);
        con.query(`UPDATE DIEN_THOAI SET HDB_MA = '${HDB_MA}' WHERE DT_IMEI = '${DT_IMEI}'`, (err, field) => {
            con.destroy();
            callback(err, field)
        });
    },


}