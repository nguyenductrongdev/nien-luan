const mysql = require('mysql');

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "nienluan",
    multipleStatements: true
}

module.exports = {
    get: (calback) => {
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
                AND HINH_ANH.LDT_MA = LOAI_DIEN_THOAI.LDT_MA`,
            (err, field) => {
                con.destroy();
                calback(err, field);
            }
        );
    },

    getByLDT_DUNG_LUONG_RAM: (LDT_DUNG_LUONG_RAM, callback) => {
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
                AND LOAI_DIEN_THOAI.LDT_DUNG_LUONG_RAM = ${LDT_DUNG_LUONG_RAM}`,
            (err, field) => {
                con.destroy();
                callback(err, field);
            }
        );
    },

    getByLDT_DUNG_LUONG_ROM: (LDT_DUNG_LUONG_ROM, callback) => {
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
                AND LOAI_DIEN_THOAI.LDT_DUNG_LUONG_ROM = ${LDT_DUNG_LUONG_ROM}`,
            (err, field) => {
                con.destroy();
                callback(err, field);
            }
        );
    },

    getGreaterOrEqualLDT_DUNG_LUONG_PIN: (LDT_DUNG_LUONG_PIN, callback) => {
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
                AND LOAI_DIEN_THOAI.LDT_DUNG_LUONG_PIN >= ${LDT_DUNG_LUONG_PIN}`,
            (err, field) => {
                con.destroy();
                callback(err, field);
            }
        );
    },

    getLessThanLDT_DUNG_LUONG_PIN: (LDT_DUNG_LUONG_PIN, callback) => {
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
                AND LOAI_DIEN_THOAI.LDT_DUNG_LUONG_PIN < ${LDT_DUNG_LUONG_PIN}`,
            (err, field) => {
                con.destroy();
                callback(err, field);
            }
        );
    },

    getByNSX_MA: (NSX_MA, callback) => {
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
                AND LOAI_DIEN_THOAI.NSX_MA = '${NSX_MA}'`,
            (err, field) => {
                con.destroy();
                callback(err, field);
            }
        );
    },
}