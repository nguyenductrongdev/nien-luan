const { query } = require('express');
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
        let sqls = [
            `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`,

            `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`
        ];
        con.query(sqls.join(';'),
            (err, fields) => {
                if (err) throw new Error(err);
                let [ldts, ctkms] = fields;
                // Loop through all LDT
                for (let i = 0; i < ldts.length; i++) {
                    let CTKM_HE_SO = 0;
                    // Find CTKM_HE_SO
                    for (let j = 0; j < ctkms.length; j++) {
                        if (ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
                            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
                        }
                    }
                    ldts[i].CTKM_HE_SO = CTKM_HE_SO;
                }
                con.destroy();
                calback(err, ldts);
            }
        );
    },

    getByLDT_DUNG_LUONG_RAM: (LDT_DUNG_LUONG_RAM, callback) => {
        let con = mysql.createConnection(config);
        let sqls = [
            `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND LDT_DUNG_LUONG_RAM = ${LDT_DUNG_LUONG_RAM}`,

            `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`
        ];
        con.query(sqls.join(';'),
            (err, fields) => {
                if (err) throw new Error(err);
                let [ldts, ctkms] = fields;
                for (let i = 0; i < ldts.length; i++) {
                    let CTKM_HE_SO = 0;
                    for (let j = 0; j < ctkms.length; j++) {
                        if (ldts[i].LDT_MA === ctkms[j].LDT_MA) {
                            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
                        }
                    }
                    ldts[i].CTKM_HE_SO = CTKM_HE_SO;
                }
                con.destroy();
                callback(err, ldts);
            }
        );
    },

    getByLDT_DUNG_LUONG_ROM: (LDT_DUNG_LUONG_ROM, callback) => {
        let con = mysql.createConnection(config);
        let sqls = [
            `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND LDT_DUNG_LUONG_ROM = ${LDT_DUNG_LUONG_ROM}`,

            `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`
        ];
        con.query(sqls.join(';'),
            (err, fields) => {
                if (err) throw new Error(err);
                let [ldts, ctkms] = fields;
                for (let i = 0; i < ldts.length; i++) {
                    let CTKM_HE_SO = 0;
                    for (let j = 0; j < ctkms.length; j++) {
                        if (ldts[i].LDT_MA === ctkms[j].LDT_MA) {
                            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
                        }
                    }
                    ldts[i].CTKM_HE_SO = CTKM_HE_SO;
                }
                con.destroy();
                callback(err, ldts);
            }
        );
    },

    getGreaterOrEqualLDT_DUNG_LUONG_PIN: (LDT_DUNG_LUONG_PIN, callback) => {
        let con = mysql.createConnection(config);
        let sqls = [
            `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND LDT_DUNG_LUONG_PIN >= ${LDT_DUNG_LUONG_PIN}`,

            `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`
        ];
        con.query(sqls.join(';'),
            (err, fields) => {
                if (err) throw new Error(err);
                let [ldts, ctkms] = fields;
                for (let i = 0; i < ldts.length; i++) {
                    let CTKM_HE_SO = 0;
                    for (let j = 0; j < ctkms.length; j++) {
                        if (ldts[i].LDT_MA === ctkms[j].LDT_MA) {
                            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
                        }
                    }
                    ldts[i].CTKM_HE_SO = CTKM_HE_SO;
                }
                con.destroy();
                callback(err, ldts);
            }
        );
    },

    getLessThanLDT_DUNG_LUONG_PIN: (LDT_DUNG_LUONG_PIN, callback) => {
        let con = mysql.createConnection(config);
        let sqls = [
            `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND LDT_DUNG_LUONG_PIN < ${LDT_DUNG_LUONG_PIN}`,

            `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`
        ];
        con.query(sqls.join(';'),
            (err, fields) => {
                if (err) throw new Error(err);
                let [ldts, ctkms] = fields;
                for (let i = 0; i < ldts.length; i++) {
                    let CTKM_HE_SO = 0;
                    for (let j = 0; j < ctkms.length; j++) {
                        if (ldts[i].LDT_MA === ctkms[j].LDT_MA) {
                            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
                        }
                    }
                    ldts[i].CTKM_HE_SO = CTKM_HE_SO;
                }
                con.destroy();
                callback(err, ldts);
            }
        );
    },

    getByLDT_MA: (LDT_MA, callback) => {
        let con = mysql.createConnection(config);
        let sqls = [
            `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = '${LDT_MA}'
                AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`,

            `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`
        ];
        con.query(sqls.join(';'),
            (err, fields) => {
                if (err) throw new Error(err);
                let [ldts, ctkms] = fields;
                // Loop through all LDT
                for (let i = 0; i < ldts.length; i++) {
                    let CTKM_HE_SO = 0;
                    // Find CTKM_HE_SO
                    for (let j = 0; j < ctkms.length; j++) {
                        if (ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
                            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
                        }
                    }
                    ldts[i].CTKM_HE_SO = CTKM_HE_SO;
                }
                con.destroy();
                callback(err, ldts);
            }
        );
    },

    getByNSX_MA: (NSX_MA, callback) => {
        let con = mysql.createConnection(config);
        let sqls = [
            `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND NSX_MA = '${NSX_MA}'`,

            `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`
        ];
        con.query(sqls.join(';'),
            (err, fields) => {
                if (err) throw new Error(err);
                let [ldts, ctkms] = fields;
                for (let i = 0; i < ldts.length; i++) {
                    let CTKM_HE_SO = 0;
                    for (let j = 0; j < ctkms.length; j++) {
                        if (ldts[i].LDT_MA === ctkms[j].LDT_MA) {
                            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
                        }
                    }
                    ldts[i].CTKM_HE_SO = CTKM_HE_SO;
                }
                con.destroy();
                callback(err, ldts);
            }
        );
    },
}