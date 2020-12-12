const { query } = require('express');
const mysql = require('mysql');
const formidable = require('formidable');
const dienThoaiModel = require('./../models/dienThoai.model');
const loaiDienThoaiModel = require('./../models/loaiDienThoai.model');
const hoaDonBanModel = require('../../models/hoaDonBan.model');
const nhaSanXuatModel = require('../models/nhaSanXuat.model');
// const config = {
//     host: "localhost",
//     user: "trongnguyen",
//     password: "trongnguyen",
//     database: "nienluan",
// }

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "nienluan",
}

module.exports.getByLDT_MA = (req, res) => {
    let { LDT_MA } = req.query;
    loaiDienThoaiModel.getByLDT_MA(LDT_MA, (err, field) => {
        res.json(field[0]);
    });
}

module.exports.getNbProducts = (req, res) => {
    let con = mysql.createConnection(config);
    con.connect(function(err) {
        if (err) throw err;
        con.query(
            `SELECT COUNT(LOAI_DIEN_THOAI.LDT_MA) AS LDT_LENGTH FROM LOAI_DIEN_THOAI`,
            function(err, result) {
                if (err) throw new Error('count ldt error');
                con.end();
                res.json(result);
            }
        );
    });
}

module.exports.page = (req, res) => {
    let page = req.query.page || 1;
    let productsPerPage = req.query.productsPerPage || 1;
    let startIndex = (page - 1) * productsPerPage;
    let endIndex = startIndex + (+productsPerPage);

    loaiDienThoaiModel.get((err, result) => {
        res.json(result.slice(startIndex, endIndex));
    });
}

module.exports.postAddBrand = (req, res) => {
    let { txtMa, txtTen } = req.query;
    let result = {
        status: '',
        message: []
    };

    if (!txtMa) {
        result.status = 'error';
        result.message.push(`Thêm không thành công, chưa nhập mã nhà sản xuât`);
    }
    if (!txtTen) {
        result.status = 'error';
        result.message.push(`Thêm không thành công, chưa nhập tên nhà sản xuât`);
    }
    if (!txtMa || !txtTen) {
        res.json(result);
        return;
    }

    let con = mysql.createConnection(config);
    con.connect(function(err) {
        if (err) throw err;
        nhaSanXuatModel.insert({ NSX_MA: txtMa, NSX_TEN: txtTen }, (err) => {
            if (err) {
                result.status = 'error';
                result.message.push(`Thêm không thành công, nhà sản xuất có mã ${txtMa} đã tôn tại`);
            } else {
                result.status = 'success';
                result.message.push('Thêm thành công');
            }
            con.end();
            res.json(result);
        });
    });
}


module.exports.postAddUnit = (req, res) => {
    let {
        slMa: LDT_MA,
        txtIMEI: DT_IMEI
    } = req.query;
    dienThoaiModel.insert({ LDT_MA, DT_IMEI }, err => {
        if (err)
            res.json({ status: 'ERROR' });
        else
            res.json({ status: 'SUCCESS' });
    });
}

module.exports.filterBrand = (req, res, next) => {
    try {
        let { brandName: NSX_MA } = req.query;
        loaiDienThoaiModel.getByNSX_MA(NSX_MA, (err, field) => {
            res.json(field);
        });
    } catch (error) {
        next(error);
    }

}

module.exports.filterROM = (req, res, next) => {
    try {
        let { ROM } = req.query;
        loaiDienThoaiModel.getByLDT_DUNG_LUONG_ROM(ROM, (err, field) => {
            res.json(field);
        });
    } catch (error) {
        next(error);
    }
}

module.exports.filterRAM = (req, res, next) => {
    try {
        let { RAM } = req.query;
        loaiDienThoaiModel.getByLDT_DUNG_LUONG_RAM(RAM, (err, field) => {
            res.json(field);
        });
    } catch (error) {
        next(error);
    }
}

module.exports.filterGEPin = (req, res, next) => {
    try {
        let con = mysql.createConnection(config);
        con.connect(err => {
            if (err) throw new Error(err);
            let { pin } = req.query;
            loaiDienThoaiModel.getGreaterOrEqualLDT_DUNG_LUONG_PIN(pin, (err, field) => {
                res.json(field);
            });
        });
    } catch (error) {
        next(error)
    }
}

module.exports.filterLTPin = (req, res, next) => {
    try {
        let con = mysql.createConnection(config);
        con.connect(err => {
            if (err) throw new Error(err);
            let { pin } = req.query;
            loaiDienThoaiModel.getLessThanLDT_DUNG_LUONG_PIN(pin, (err, field) => {
                res.json(field);
            });
        });
    } catch (error) {
        next(error)
    }
}

module.exports.postAddDiscount = (req, res, next) => {
    try {
        let form = formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let {
                maChuongTrinhKhuyenMai,
                tenChuongTrinhKhuyenMai,
                heSoChuongTrinhKhuyenMai,
                ngayKetThucChuongTrinhKhuyenMai,
                maSanPhams
            } = fields;
            let produdctIDs = [...maSanPhams.split(',')];
            let con = mysql.createConnection(config);
            con.connect(err => {
                con.query(`
                    INSERT INTO CHUONG_TRINH_KHUYEN_MAI(CTKM_MA, CTKM_TEN, CTKM_NGAY_KET_THUC, CTKM_HE_SO) 
                    VALUES('${maChuongTrinhKhuyenMai}', '${tenChuongTrinhKhuyenMai}', '${ngayKetThucChuongTrinhKhuyenMai}', ${heSoChuongTrinhKhuyenMai})`,
                    (err, result) => {
                        if (err) {
                            res.json('ERROR');
                            return;
                        };
                        res.json('OK');
                    }
                );
                for (let ID of produdctIDs) {
                    con.query(
                        `UPDATE LOAI_DIEN_THOAI 
                        SET 
                            CTKM_MA = '${maChuongTrinhKhuyenMai}' 
                        WHERE LDT_MA = '${ID}'`,
                        err => {
                            if (err) {
                                throw new Error('Add product to discount error');
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
}

module.exports.postAddBill = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    let form = formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        let {
            billID: HDB_MA,
            typerName: ND_TEN_DANG_NHAP,
            time: HDB_THOI_GIAN,
            billProductIDs,
            billProductNbs
        } = fields;
        LDT_MAs = [...billProductIDs.split(',')];
        billProductNbs = [...billProductNbs.split(',')].map(item => +item);

        dienThoaiModel.get((err, field) => {
            let isAllProductEnough = true;
            if (err) throw Error('get all dien thoai error');
            // get all DIEN_THOAI row has null value at HDB_MA field
            let buyableProducts = field.filter(item => !item.HDB_MA);
            for (let i = 0; i < LDT_MAs.length; i++) {
                let canBuyNb = billProductNbs[i];
                let remainNb = buyableProducts
                    .filter(item => item.LDT_MA === LDT_MAs[i])
                    .length;
                console.log(canBuyNb, remainNb);
                if (canBuyNb > remainNb) {
                    isAllProductEnough = false;
                    break;
                }
            }
            console.log(isAllProductEnough);
            if (isAllProductEnough) {
                hoaDonBanModel.insert({ HDB_MA, ND_TEN_DANG_NHAP, HDB_THOI_GIAN }, (err) => {
                    for (let i = 0; i < LDT_MAs.length; i++) {
                        let LDT_MA = LDT_MAs[i];
                        let billProductNb = billProductNbs[i];
                        let buyProducts = buyableProducts
                            .filter(item => item.LDT_MA === LDT_MA)
                            .slice(-billProductNb);
                        for (let buyProduct of buyProducts) {
                            dienThoaiModel.updateSetHDB_MAWhereDT_IMEI(
                                HDB_MA,
                                buyProduct.DT_IMEI,
                                err => {
                                    if (err) throw new Error(err);
                                }
                            );
                        }
                    }
                    res.json({
                        result: 'OK',
                        message: 'Thêm hóa đơn thành công'
                    });
                });
            } else {
                res.json({
                    result: 'ERROR',
                    message: 'Not enough product to buy'
                });
            }
        });
    });
}


module.exports.postEditDiscount = (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let form = formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let {
                maChuongTrinhKhuyenMai,
                tenChuongTrinhKhuyenMai,
                heSoChuongTrinhKhuyenMai,
                ngayKetThucChuongTrinhKhuyenMai,
                maSanPhams
            } = fields;
            let produdctIDs = [...maSanPhams.split(',')];
            let con = mysql.createConnection(config);
            con.connect(err => {
                con.query(
                    `UPDATE CHUONG_TRINH_KHUYEN_MAI
                    SET 
                        CTKM_TEN = '${tenChuongTrinhKhuyenMai}',
                        CTKM_NGAY_KET_THUC = '${ngayKetThucChuongTrinhKhuyenMai}',
                        CTKM_HE_SO = ${heSoChuongTrinhKhuyenMai}
                    WHERE CTKM_MA = '${maChuongTrinhKhuyenMai}'`,
                    (err) => {
                        if (err) {
                            res.json({ result: 'ERROR' });
                            return;
                        };
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
                                err => {
                                    if (err) {
                                        throw new Error('Add psroduct to discount error');
                                    }
                                }
                            );
                        }
                        res.json({ result: 'OK' });
                        con.end();
                    }
                );
            });
        });
    } catch (error) {
        next(error);
    }
}