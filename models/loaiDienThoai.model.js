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
                for (let i = 0; i < ldts.length; i++) {
                    let CTKM_HE_SO = 0;
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
                for (let i = 0; i < ldts.length; i++) {
                    let CTKM_HE_SO = 0;
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
    }
}