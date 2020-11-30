const { query } = require('express');
const mysql = require('mysql');
const formidable = require('formidable');

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
    let startPoint = (page - 1) * productsPerPage;

    let con = mysql.createConnection(config);
    con.connect(function(err) {
        if (err) throw err;
        con.query(
            `SELECT
                DISTINCT LOAI_DIEN_THOAI.LDT_MA,
                LOAI_DIEN_THOAI.LDT_TEN,
                HINH_ANH.HA_URL,
                LOAI_DIEN_THOAI.LDT_GIA,
                IF(LOAI_DIEN_THOAI.CTKM_MA IS NULL, 0, ROUND(CHUONG_TRINH_KHUYEN_MAI.CTKM_HE_SO, 1)) as CTKM_HESO
            FROM
                LOAI_DIEN_THOAI, CHUONG_TRINH_KHUYEN_MAI, HINH_ANH
            WHERE
                (LOAI_DIEN_THOAI.CTKM_MA = CHUONG_TRINH_KHUYEN_MAI.CTKM_MA
                OR LOAI_DIEN_THOAI.CTKM_MA IS NULL)
                AND HINH_ANH.LDT_MA = LOAI_DIEN_THOAI.LDT_MA
            LIMIT ${startPoint}, ${productsPerPage}`,
            function(err, result) {
                if (err) throw new Error('get page error');
                con.end();
                result = result.map(item => {
                    item.LDT_GIA -= (item.LDT_GIA * item.CTKM_HESO);
                    item.LDT_GIA = item.LDT_GIA.toLocaleString('vi-VN');
                    return item;
                });
                res.json(result);
            }
        );
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


// module.exports.postAddUnit = (req, res) => {
//     let {
//         slMa,
//         txtIMEI
//     } = req.query;

//     let con = mysql.createConnection(config);
//     con.connect(function(err) {
//         if (err) throw err;
//         con.query(
//             `INSERT INTO DIEN_THOAI(DT_IMEI, LDT_MA)
//                     VALUES('${txtIMEI}', '${slMa}')`,
//             function(err) {
//                 let resObj = {};
//                 if (err)
//                     resObj.status = 'error'
//                 else
//                     resObj.status = 'success'
//                 res.json(resObj);
//             }
//         );
//         con.end();
//     });
// }
let dienThoaiModel = require('./../models/dienThoai.model');
module.exports.postAddUnit = (req, res) => {
    let {
        slMa: LDT_MA,
        txtIMEI: DT_IMEI
    } = req.query;
    let result = false;
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