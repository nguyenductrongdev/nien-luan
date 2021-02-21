const mysql = require("mysql");
const formidable = require("formidable");
const dienThoaiModel = require("./../models/dienThoai.model");
const loaiDienThoaiModel = require("./../models/loaiDienThoai.model");
const hoaDonBanModel = require("../../models/hoaDonBan.model");
const nhaSanXuatModel = require("../models/nhaSanXuat.model");
const mysqlConf = require("./../../mysqlConf");

module.exports.getByLDT_MA = (req, res, next) => {
  try {
    let { LDT_MA } = req.query;
    loaiDienThoaiModel.getByLDT_MA(LDT_MA, (err, field) => {
      res.json(field[0]);
    });
  } catch (error) {
    next(error);
  }
};

module.exports.filter = (req, res, next) => {
  try {
    let { rams = "", roms = "", brands = "", pins = "" } = req.query;

    console.log(">>", rams);

    rams = [...rams.split(",")].filter((item) => item !== "");
    roms = [...roms.split(",")].filter((item) => item !== "");
    brands = [...brands.split(",")].filter((item) => item !== "");
    pins = [...pins.split(",")].filter((item) => item !== "");

    loaiDienThoaiModel.get((err, data) => {
      if (err) throw err;
      res.json(
        data.filter((product) => {
          let ramValid = false;
          let romValid = false;
          let brandValid = false;
          let pinValid = false;

          // check for ram
          if (
            rams.length === 0 ||
            rams.includes(product.LDT_DUNG_LUONG_RAM + "")
          )
            ramValid = true;

          // check for rom
          if (
            roms.length === 0 ||
            roms.includes(product.LDT_DUNG_LUONG_ROM + "")
          )
            romValid = true;

          // check for brand
          if (brands.length === 0 || brands.includes(product.NSX_MA + ""))
            brandValid = true;

          // check for pin
          if (pins.length === 0) pinValid = true;
          else if (
            pins.includes(">=4000") &&
            product.LDT_DUNG_LUONG_PIN >= 4000
          )
            pinValid = true;
          else if (pins.includes("<4000") && product.LDT_DUNG_LUONG_PIN < 4000)
            pinValid = true;

          // return true if match all condition
          return ramValid && romValid && brandValid && pinValid;
        })
      );
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getNbProducts = (req, res) => {
  let con = mysql.createConnection(mysqlConf);
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `SELECT COUNT(LOAI_DIEN_THOAI.LDT_MA) AS LDT_LENGTH 
                FROM LOAI_DIEN_THOAI
                WHERE LDT_CON_KINH_DOANH = 1`,
      function (err, result) {
        if (err) throw new Error("count ldt error");
        con.end();
        res.json(result);
      }
    );
  });
};

module.exports.searchByLDT_TEN = (req, res) => {
  let { content = "" } = req.query;
  loaiDienThoaiModel.get((err, result) => {
    // filter by LDT_TEN
    result = result.filter((item) => {
      return (
        item.LDT_CON_KINH_DOANH &&
        item.LDT_TEN.toUpperCase().includes(content.toUpperCase())
      );
    });
    res.json(result);
  });
};

module.exports.page = (req, res) => {
  let page = req.query.page || 1;
  let productsPerPage = req.query.productsPerPage || 1;
  let startIndex = (page - 1) * productsPerPage;
  let endIndex = startIndex + +productsPerPage;
  loaiDienThoaiModel.get((err, result) => {
    if (err) throw err;
    // filter to get all product
    result = result.filter((item) => item.LDT_CON_KINH_DOANH);
    res.json(result.slice(startIndex, endIndex));
  });
};

module.exports.postAddBrand = (req, res) => {
  let { txtMa, txtTen } = req.query;
  let result = {
    status: "",
    message: "",
  };
  nhaSanXuatModel.insert({ NSX_MA: txtMa, NSX_TEN: txtTen }, (err) => {
    result = {};
    if (err) {
      result.status = "error";
      result.message = `Thêm không thành công, nhà sản xuất có mã ${txtMa} đã tôn tại`;
    } else {
      result.status = "success";
      result.message = "Thêm thành công";
    }
    res.json(result);
  });
};

module.exports.postAddUnit = (req, res) => {
  let { slMa: LDT_MA, txtIMEI: DT_IMEI } = req.query;
  dienThoaiModel.insert({ LDT_MA, DT_IMEI }, (err) => {
    if (err) res.json({ status: "ERROR" });
    else res.json({ status: "SUCCESS" });
  });
};

module.exports.postAddDiscount = (req, res, next) => {
  try {
    let form = formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      let {
        maChuongTrinhKhuyenMai,
        tenChuongTrinhKhuyenMai,
        heSoChuongTrinhKhuyenMai,
        ngayKetThucChuongTrinhKhuyenMai,
        maSanPhams,
      } = fields;
      let produdctIDs = [...maSanPhams.split(",")];
      let con = mysql.createConnection(mysqlConf);
      con.connect((err) => {
        con.query(
          `
                    INSERT INTO CHUONG_TRINH_KHUYEN_MAI(CTKM_MA, CTKM_TEN, CTKM_NGAY_KET_THUC, CTKM_HE_SO) 
                    VALUES('${maChuongTrinhKhuyenMai}', '${tenChuongTrinhKhuyenMai}', '${ngayKetThucChuongTrinhKhuyenMai}', ${heSoChuongTrinhKhuyenMai})`,
          (err, result) => {
            if (err) {
              res.json("ERROR");
              return;
            }
            res.json("OK");
          }
        );
        for (let ID of produdctIDs) {
          con.query(
            `UPDATE LOAI_DIEN_THOAI 
                        SET 
                            CTKM_MA = '${maChuongTrinhKhuyenMai}' 
                        WHERE LDT_MA = '${ID}'`,
            (err) => {
              if (err) {
                throw new Error("Add product to discount error");
              }
            }
          );
        }
        con.end();
      });
    });
  } catch (error) {
    next(error);
  }
};

// START BILL ----------------------------------
module.exports.postAddBill = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  let form = formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    let {
      billID: HDB_MA,
      typerName: ND_TEN_DANG_NHAP,
      time: HDB_THOI_GIAN,
      billProductIDs,
      billProductNbs,
    } = fields;
    LDT_MAs = [...billProductIDs.split(",")];
    billProductNbs = [...billProductNbs.split(",")].map((item) => +item);

    dienThoaiModel.get((err, field) => {
      let isAllProductEnough = true;
      if (err) throw Error("get all dien thoai error");
      // get all DIEN_THOAI row has null value at HDB_MA field
      let buyableProducts = field.filter((item) => !item.HDB_MA);
      for (let i = 0; i < LDT_MAs.length; i++) {
        let canBuyNb = billProductNbs[i];
        let remainNb = buyableProducts.filter(
          (item) => item.LDT_MA === LDT_MAs[i]
        ).length;
        // console.log(canBuyNb, remainNb);
        if (canBuyNb > remainNb) {
          isAllProductEnough = false;
          break;
        }
      }
      // console.log(isAllProductEnough);
      if (isAllProductEnough) {
        hoaDonBanModel.insert(
          { HDB_MA, ND_TEN_DANG_NHAP, HDB_THOI_GIAN },
          (err) => {
            for (let i = 0; i < LDT_MAs.length; i++) {
              let LDT_MA = LDT_MAs[i];
              let billProductNb = billProductNbs[i];
              let buyProducts = buyableProducts
                .filter((item) => item.LDT_MA === LDT_MA)
                .slice(-billProductNb);
              for (let buyProduct of buyProducts) {
                dienThoaiModel.updateSetHDB_MAWhereDT_IMEI(
                  HDB_MA,
                  buyProduct.DT_IMEI,
                  (err) => {
                    if (err) throw new Error(err);
                  }
                );
              }
            }
            res.json({
              result: "OK",
              message: "Thêm hóa đơn thành công",
            });
          }
        );
      } else {
        res.json({
          result: "ERROR",
          message: "Không đủ sản phẩm để bán",
        });
      }
    });
  });
};

module.exports.getBills = (req, res, next) => {
  try {
    let { date, month, year } = req.query;
    console.log(date, month, year);
    hoaDonBanModel.get({ date, month, year }, (err, result) => {
      res.json(result);
    });
  } catch (error) {
    next(error);
  }
};
// END BILL ----------------------------------

module.exports.postEditDiscount = (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    let form = formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      let {
        maChuongTrinhKhuyenMai,
        tenChuongTrinhKhuyenMai,
        heSoChuongTrinhKhuyenMai,
        ngayKetThucChuongTrinhKhuyenMai,
        maSanPhams,
      } = fields;
      let produdctIDs = [...maSanPhams.split(",")];
      let con = mysql.createConnection(mysqlConf);
      con.connect((err) => {
        con.query(
          `UPDATE CHUONG_TRINH_KHUYEN_MAI
                    SET 
                        CTKM_TEN = '${tenChuongTrinhKhuyenMai}',
                        CTKM_NGAY_KET_THUC = '${ngayKetThucChuongTrinhKhuyenMai}',
                        CTKM_HE_SO = ${heSoChuongTrinhKhuyenMai}
                    WHERE CTKM_MA = '${maChuongTrinhKhuyenMai}'`,
          (err) => {
            if (err) {
              res.json({ result: "ERROR" });
              return;
            }
          }
        );
        // set all Dien thoai has CTKM equal maChuongTrinhKhuyenMai is null
        con.query(
          `UPDATE LOAI_DIEN_THOAI 
                        SET CTKM_MA = ${null} 
                    WHERE CTKM_MA = '${maChuongTrinhKhuyenMai}'`,
          (err) => {
            if (err) throw new Error(err);
            // update maChuongTrinhKhuyenMai all Dien thoai after re-choose
            for (let ID of produdctIDs) {
              con.query(
                `UPDATE LOAI_DIEN_THOAI 
                                    SET CTKM_MA = '${maChuongTrinhKhuyenMai}' 
                                WHERE LDT_MA = '${ID}'`,
                (err) => {
                  if (err) {
                    throw new Error("Add psroduct to discount error");
                  }
                }
              );
            }
            res.json({ result: "OK" });
            con.end();
          }
        );
      });
    });
  } catch (error) {
    next(error);
  }
};
