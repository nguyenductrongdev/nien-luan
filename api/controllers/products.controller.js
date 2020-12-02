const { query } = require('express');
const mysql = require('mysql');
const formidable = require('formidable');
const dienThoaiModel = require('./../models/dienThoai.model');
const loaiDienThoaiModel = require('./../models/loaiDienThoai.model');
const hoaDonBanModel = require('../../models/hoaDonBan.model');
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
    let endIndex = startIndex + productsPerPage

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
        con.query(
            `INSERT INTO NHA_SAN_XUAT(NSX_MA, NSX_TEN) VALUES('${txtMa}', '${txtTen}')`,
            function(err) {
                if (err) {
                    result.status = 'error';
                    result.message.push(`Thêm không thành công, nhà sản xuất có mã ${txtMa} đã tôn tại`);
                } else {
                    result.status = 'success';
                    result.message.push('Thêm thành công');
                }
                con.end();
                res.json(result);
                return;
            }
        );
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

module.exports.filterBrand = (req, res) => {
    let { brandName } = req.query;
    let con = mysql.createConnection(config);
    con.connect(function(err) {
        if (err) throw err;
        con.query(
            `SELECT LOAI_DIEN_THOAI.LDT_MA, LDT_TEN, LDT_GIA, HINH_ANH.HA_URL, NHA_SAN_XUAT.NSX_MA
            FROM LOAI_DIEN_THOAI, HINH_ANH, NHA_SAN_XUAT
            WHERE 
                NHA_SAN_XUAT.NSX_MA = '${brandName}'
                AND NHA_SAN_XUAT.NSX_MA = LOAI_DIEN_THOAI.NSX_MA
                AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`,
            function(err, result) {
                if (err) throw err;
                con.end();
                result = result.map(item => {
                    item.LDT_GIA = item.LDT_GIA.toLocaleString('vi-VN');
                    return item;
                });
                res.json(result);
                return;
            }
        );
    });
}

module.exports.filterROM = (req, res, next) => {
    try {
        let ROM = req.query.ROM;
        let con = mysql.createConnection(config);
        con.query(
            `SELECT LOAI_DIEN_THOAI.LDT_MA, LDT_TEN, LDT_GIA, HINH_ANH.HA_URL, NHA_SAN_XUAT.NSX_MA
            FROM LOAI_DIEN_THOAI, HINH_ANH, NHA_SAN_XUAT
            WHERE 
                LOAI_DIEN_THOAI.LDT_DUNG_LUONG_ROM = ${ROM}
                AND NHA_SAN_XUAT.NSX_MA = LOAI_DIEN_THOAI.NSX_MA
                AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`,
            (err, result) => {
                if (err) throw new Error('Fetch by ROM error');
                con.end();
                res.json(result.map(phone => {
                    phone.LDT_GIA = phone.LDT_GIA.toLocaleString('vi-VN');
                    return phone;
                }));
            }
        )
    } catch (error) {
        next(error);
    }
}

module.exports.filterRAM = (req, res, next) => {
    try {
        let RAM = req.query.RAM;
        let con = mysql.createConnection(config);
        con.query(
            `SELECT LOAI_DIEN_THOAI.LDT_MA, LDT_TEN, LDT_GIA, HINH_ANH.HA_URL, NHA_SAN_XUAT.NSX_MA
            FROM LOAI_DIEN_THOAI, HINH_ANH, NHA_SAN_XUAT
            WHERE 
                LOAI_DIEN_THOAI.LDT_DUNG_LUONG_RAM = ${RAM}
                AND NHA_SAN_XUAT.NSX_MA = LOAI_DIEN_THOAI.NSX_MA
                AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`,
            (err, result) => {
                if (err) throw new Error('Fetch by RAM error');
                con.end();
                res.json(result.map(phone => {
                    phone.LDT_GIA = phone.LDT_GIA.toLocaleString('vi-VN');
                    return phone;
                }));
            }
        )
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
            con.query(`
                SELECT LOAI_DIEN_THOAI.LDT_MA, LDT_TEN, LDT_GIA, HINH_ANH.HA_URL, NHA_SAN_XUAT.NSX_MA
                FROM LOAI_DIEN_THOAI, HINH_ANH, NHA_SAN_XUAT
                WHERE 
                    LOAI_DIEN_THOAI.LDT_DUNG_LUONG_PIN >= ${pin}
                    AND NHA_SAN_XUAT.NSX_MA = LOAI_DIEN_THOAI.NSX_MA
                    AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`,
                (err, result) => {
                    if (err) throw new Error(err);
                    con.end();
                    res.json(result.map(phone => {
                        phone.LDT_GIA = phone.LDT_GIA.toLocaleString('vi-VN');
                        return phone;
                    }));
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
            con.query(`
                SELECT LOAI_DIEN_THOAI.LDT_MA, LDT_TEN, LDT_GIA, HINH_ANH.HA_URL, NHA_SAN_XUAT.NSX_MA
                FROM LOAI_DIEN_THOAI, HINH_ANH, NHA_SAN_XUAT
                WHERE 
                    LOAI_DIEN_THOAI.LDT_DUNG_LUONG_PIN < ${pin}
                    AND NHA_SAN_XUAT.NSX_MA = LOAI_DIEN_THOAI.NSX_MA
                    AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`,
                (err, result) => {
                    if (err) throw new Error(err);
                    con.end();
                    res.json(result.map(phone => {
                        phone.LDT_GIA = phone.LDT_GIA.toLocaleString('vi-VN');
                        return phone;
                    }));
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

// module.exports.postAddBill = (req, res, next) => {
//     res.setHeader('Content-Type', 'application/json');
//     let form = formidable.IncomingForm();
//     form.parse(req, (err, fields) => {
//         let {
//             billID: HDB_MA,
//             typerName: ND_TEN_DANG_NHAP,
//             time: HDB_THOI_GIAN,
//             billProductIDs,
//             billProductNbs
//         } = fields;
//         LDT_MAs = [...billProductIDs.split(',')];
//         billProductNbs = [...billProductNbs.split(',')].map(item => +item);
//         hoaDonBanModel.insert({ HDB_MA, ND_TEN_DANG_NHAP, HDB_THOI_GIAN }, (err) => {
//             if (err) {
//                 res.json({
//                     result: 'ERROR',
//                     message: 'Hoa don is exist'
//                 });
//                 return;
//             } else {
//                 dienThoaiModel.get((err, field) => {
//                     if (err) throw Error('get all dien thoai error');
//                     // get all DIEN_THOAI row has null value at HDB_MA field
//                     let buyableProducts = field.filter(item => !item.HDB_MA);
//                     console.log('>>', buyableProducts);
//                     let isAllProductEnough = true;
//                     for (let j = 0; j < LDT_MAs.length; j++) {
//                         if (billProductNbs[i] >
//                             buyableProducts.filter(item => item.LDT_MA === LDT_MAs[i]).length) {
//                             isAllProductEnough = false;
//                             break;
//                         }

//                     }
//                     for (let i = 0; i < LDT_MAs.length; i++) {
//                         let LDT_MA = LDT_MAs[i];
//                         let billProductNb = billProductNbs[i];
//                         let buyProducts = buyableProducts
//                             .filter(item => item.LDT_MA = LDT_MA)
//                             .slice(-billProductNb);

//                         if (billProductNb <= buyProducts.length) {
//                             console.log('so luong con >= can ban');
//                             for (let buyProduct of buyProducts) {
//                                 dienThoaiModel.updateSetHDB_MAWhereDT_IMEI(HDB_MA, buyProduct.DT_IMEI, err => {
//                                     if (err) throw new Error(err);
//                                 });
//                             }
//                             res.json({
//                                 result: 'OK',
//                                 message: 'Thêm hóa đơn thành công'
//                             });
//                         } else {
//                             console.log('Khong du de ban');
//                             res.json({
//                                 result: 'ERROR',
//                                 message: 'Not enough product to buy'
//                             });
//                         }
//                     }
//                 });
//             }
//         });
//     });
//     next();
// }

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
        console.log('call api post add discount');
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