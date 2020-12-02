const mysql = require('mysql');

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "nienluan",
    multipleStatements: true
}

module.exports = {
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
    }
}