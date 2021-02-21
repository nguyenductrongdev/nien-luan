const mysql = require("mysql");
const mysqlConf = require("./../../mysqlConf");

module.exports = {
  get: (calback) => {
    let con = mysql.createConnection(mysqlConf);
    let sqls = [
      `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`,

      `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`,
    ];
    con.query(sqls.join(";"), (err, fields) => {
      if (err) throw new Error(err);
      let [ldts, ctkms] = fields;
      // Loop through all LDT
      for (let i = 0; i < ldts.length; i++) {
        let CTKM_HE_SO = 0;
        // Find CTKM_HE_SO
        for (let j = 0; j < ctkms.length; j++) {
          let [ctkm_year, ctkm_month, ctkm_date] = ctkms[
            j
          ].CTKM_NGAY_KET_THUC.split("-");
          ctkm_year = +ctkm_year;
          ctkm_month = +ctkm_month;
          ctkm_date = +ctkm_date;

          let endDate = new Date(ctkm_year, ctkm_month - 1, ctkm_date);
          let nowDate = new Date();

          let isDiscount = true;
          if (endDate.getFullYear() < nowDate.getFullYear()) isDiscount = false;
          else if (endDate.getMonth() < nowDate.getMonth()) isDiscount = false;
          else if (endDate.getDate() < nowDate.getDate()) isDiscount = false;

          if (isDiscount && ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
          }
        }
        ldts[i].CTKM_HE_SO = CTKM_HE_SO;
      }
      con.destroy();
      calback(err, ldts);
    });
  },

  getByLDT_DUNG_LUONG_RAM: (LDT_DUNG_LUONG_RAM, callback) => {
    let con = mysql.createConnection(mysqlConf);
    let sqls = [
      `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND LDT_DUNG_LUONG_RAM = ${LDT_DUNG_LUONG_RAM}`,

      `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`,
    ];
    con.query(sqls.join(";"), (err, fields) => {
      if (err) throw new Error(err);
      let [ldts, ctkms] = fields;
      // Loop through all LDT
      for (let i = 0; i < ldts.length; i++) {
        let CTKM_HE_SO = 0;
        // Find CTKM_HE_SO
        for (let j = 0; j < ctkms.length; j++) {
          let [ctkm_year, ctkm_month, ctkm_date] = ctkms[
            j
          ].CTKM_NGAY_KET_THUC.split("-");
          ctkm_year = +ctkm_year;
          ctkm_month = +ctkm_month;
          ctkm_date = +ctkm_date;

          let endDate = new Date(ctkm_year, ctkm_month - 1, ctkm_date);
          let nowDate = new Date();
          let conKhuyenMai = true;
          if (endDate.getFullYear() < nowDate.getFullYear())
            conKhuyenMai = false;
          else if (endDate.getMonth() < nowDate.getMonth())
            conKhuyenMai = false;
          else if (endDate.getDate() < nowDate.getDate()) conKhuyenMai = false;

          if (conKhuyenMai && ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
          }
        }
        ldts[i].CTKM_HE_SO = CTKM_HE_SO;
      }
      con.destroy();
      callback(err, ldts);
    });
  },

  getByLDT_DUNG_LUONG_ROM: (LDT_DUNG_LUONG_ROM, callback) => {
    let con = mysql.createConnection(mysqlConf);
    let sqls = [
      `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND LDT_DUNG_LUONG_ROM = ${LDT_DUNG_LUONG_ROM}`,

      `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`,
    ];
    con.query(sqls.join(";"), (err, fields) => {
      if (err) throw new Error(err);
      let [ldts, ctkms] = fields;
      // Loop through all LDT
      for (let i = 0; i < ldts.length; i++) {
        let CTKM_HE_SO = 0;
        // Find CTKM_HE_SO
        for (let j = 0; j < ctkms.length; j++) {
          let [ctkm_year, ctkm_month, ctkm_date] = ctkms[
            j
          ].CTKM_NGAY_KET_THUC.split("-");
          ctkm_year = +ctkm_year;
          ctkm_month = +ctkm_month;
          ctkm_date = +ctkm_date;

          let endDate = new Date(ctkm_year, ctkm_month - 1, ctkm_date);
          let nowDate = new Date();

          let conKhuyenMai = true;
          if (endDate.getFullYear() < nowDate.getFullYear())
            conKhuyenMai = false;
          else if (endDate.getMonth() < nowDate.getMonth())
            conKhuyenMai = false;
          else if (endDate.getDate() < nowDate.getDate()) conKhuyenMai = false;

          if (conKhuyenMai && ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
          }
        }
        ldts[i].CTKM_HE_SO = CTKM_HE_SO;
      }
      con.destroy();
      callback(err, ldts);
    });
  },

  getGreaterOrEqualLDT_DUNG_LUONG_PIN: (LDT_DUNG_LUONG_PIN, callback) => {
    let con = mysql.createConnection(mysqlConf);
    let sqls = [
      `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND LDT_DUNG_LUONG_PIN >= ${LDT_DUNG_LUONG_PIN}`,

      `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`,
    ];
    con.query(sqls.join(";"), (err, fields) => {
      if (err) throw new Error(err);
      let [ldts, ctkms] = fields;
      // Loop through all LDT
      for (let i = 0; i < ldts.length; i++) {
        let CTKM_HE_SO = 0;
        // Find CTKM_HE_SO
        for (let j = 0; j < ctkms.length; j++) {
          let [ctkm_year, ctkm_month, ctkm_date] = ctkms[
            j
          ].CTKM_NGAY_KET_THUC.split("-");
          ctkm_year = +ctkm_year;
          ctkm_month = +ctkm_month;
          ctkm_date = +ctkm_date;

          let endDate = new Date(ctkm_year, ctkm_month - 1, ctkm_date);
          let nowDate = new Date();

          let conKhuyenMai = true;
          if (endDate.getFullYear() < nowDate.getFullYear())
            conKhuyenMai = false;
          else if (endDate.getMonth() < nowDate.getMonth())
            conKhuyenMai = false;
          else if (endDate.getDate() < nowDate.getDate()) conKhuyenMai = false;

          if (conKhuyenMai && ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
          }
        }
        ldts[i].CTKM_HE_SO = CTKM_HE_SO;
      }
      con.destroy();
      callback(err, ldts);
    });
  },

  getLessThanLDT_DUNG_LUONG_PIN: (LDT_DUNG_LUONG_PIN, callback) => {
    let con = mysql.createConnection(mysqlConf);
    let sqls = [
      `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND LDT_DUNG_LUONG_PIN < ${LDT_DUNG_LUONG_PIN}`,

      `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`,
    ];
    con.query(sqls.join(";"), (err, fields) => {
      if (err) throw new Error(err);
      let [ldts, ctkms] = fields;
      // Loop through all LDT
      for (let i = 0; i < ldts.length; i++) {
        let CTKM_HE_SO = 0;
        // Find CTKM_HE_SO
        for (let j = 0; j < ctkms.length; j++) {
          let [ctkm_year, ctkm_month, ctkm_date] = ctkms[
            j
          ].CTKM_NGAY_KET_THUC.split("-");
          ctkm_year = +ctkm_year;
          ctkm_month = +ctkm_month;
          ctkm_date = +ctkm_date;

          let endDate = new Date(ctkm_year, ctkm_month - 1, ctkm_date);
          let nowDate = new Date();

          let conKhuyenMai = true;
          if (endDate.getFullYear() < nowDate.getFullYear())
            conKhuyenMai = false;
          else if (endDate.getMonth() < nowDate.getMonth())
            conKhuyenMai = false;
          else if (endDate.getDate() < nowDate.getDate()) conKhuyenMai = false;

          if (conKhuyenMai && ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
          }
        }
        ldts[i].CTKM_HE_SO = CTKM_HE_SO;
      }
      con.destroy();
      callback(err, ldts);
    });
  },

  getByLDT_MA: (LDT_MA, callback) => {
    let con = mysql.createConnection(mysqlConf);
    let sqls = [
      `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = '${LDT_MA}'
                AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`,

      `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`,
    ];
    con.query(sqls.join(";"), (err, fields) => {
      if (err) throw new Error(err);
      let [ldts, ctkms] = fields;
      // Loop through all LDT
      for (let i = 0; i < ldts.length; i++) {
        let CTKM_HE_SO = 0;
        // Find CTKM_HE_SO
        for (let j = 0; j < ctkms.length; j++) {
          let [ctkm_year, ctkm_month, ctkm_date] = ctkms[
            j
          ].CTKM_NGAY_KET_THUC.split("-");
          ctkm_year = +ctkm_year;
          ctkm_month = +ctkm_month;
          ctkm_date = +ctkm_date;

          let endDate = new Date(ctkm_year, ctkm_month - 1, ctkm_date);
          let nowDate = new Date();

          let conKhuyenMai = true;
          if (endDate.getFullYear() < nowDate.getFullYear())
            conKhuyenMai = false;
          else if (endDate.getMonth() < nowDate.getMonth())
            conKhuyenMai = false;
          else if (endDate.getDate() < nowDate.getDate()) conKhuyenMai = false;

          if (conKhuyenMai && ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
          }
        }
        ldts[i].CTKM_HE_SO = CTKM_HE_SO;
      }
      con.destroy();
      callback(err, ldts);
    });
  },

  getByNSX_MA: (NSX_MA, callback) => {
    let con = mysql.createConnection(mysqlConf);
    let sqls = [
      `SELECT * 
            FROM 
                LOAI_DIEN_THOAI, HINH_ANH 
            WHERE 
                LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
                AND NSX_MA = '${NSX_MA}'`,

      `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`,
    ];
    con.query(sqls.join(";"), (err, fields) => {
      if (err) throw new Error(err);
      let [ldts, ctkms] = fields;
      // Loop through all LDT
      for (let i = 0; i < ldts.length; i++) {
        let CTKM_HE_SO = 0;
        // Find CTKM_HE_SO
        for (let j = 0; j < ctkms.length; j++) {
          let [ctkm_year, ctkm_month, ctkm_date] = ctkms[
            j
          ].CTKM_NGAY_KET_THUC.split("-");
          ctkm_year = +ctkm_year;
          ctkm_month = +ctkm_month;
          ctkm_date = +ctkm_date;

          let endDate = new Date(ctkm_year, ctkm_month - 1, ctkm_date);
          let nowDate = new Date();
          let conKhuyenMai = true;
          if (endDate.getFullYear() < nowDate.getFullYear())
            conKhuyenMai = false;
          else if (endDate.getMonth() < nowDate.getMonth())
            conKhuyenMai = false;
          else if (endDate.getDate() < nowDate.getDate()) conKhuyenMai = false;

          if (conKhuyenMai && ldts[i].CTKM_MA === ctkms[j].CTKM_MA) {
            CTKM_HE_SO = ctkms[j].CTKM_HE_SO;
          }
        }
        ldts[i].CTKM_HE_SO = CTKM_HE_SO;
      }
      con.destroy();
      callback(err, ldts);
    });
  },
};
