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
        let sqls = [
            `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH, NHA_SAN_XUAT
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND LOAI_DIEN_THOAI.NSX_MA = NHA_SAN_XUAT.NSX_MA`,

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
                        let [ctkm_year, ctkm_month, ctkm_date] = ctkms[j].CTKM_NGAY_KET_THUC.split('-');
                        ctkm_year = +ctkm_year;
                        ctkm_month = +ctkm_month;
                        ctkm_date = +ctkm_date;

                        let endDate = new Date(ctkm_year, ctkm_month - 1, ctkm_date);
                        let nowDate = new Date();

                        if (+endDate > +nowDate &&
                            ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
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
                LOAI_DIEN_THOAI, HINH_ANH, NHA_SAN_XUAT  
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = '${LDT_MA}'
                AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND LOAI_DIEN_THOAI.NSX_MA = NHA_SAN_XUAT.NSX_MA`,

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
                        let [ctkm_year, ctkm_month, ctkm_date] = ctkms[j].CTKM_NGAY_KET_THUC.split('-');
                        ctkm_year = +ctkm_year;
                        ctkm_month = +ctkm_month;
                        ctkm_date = +ctkm_date;

                        let endDate = new Date(ctkm_year, ctkm_month - 1, ctkm_date);
                        let nowDate = new Date();

                        if (+endDate > +nowDate &&
                            ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
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

    deleteByLDT_MA: (LDT_MA, callback) => {
        let con = mysql.createConnection(config);
        con.query(
            `UPDATE LOAI_DIEN_THOAI 
            SET CTKM_MA = ${null} WHERE CTKM_MA = '${ma}';
            DELETE FROM CHUONG_TRINH_KHUYEN_MAI WHERE CTKM_MA = '${LDT_MA}'`,
            (err) => {
                con.destroy();
                callback(err);
            }
        );
    }
}