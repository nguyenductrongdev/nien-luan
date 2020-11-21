const { query } = require('express');
const mysql = require('mysql');

const config = {
    host: "localhost",
    user: "trongnguyen",
    password: "trongnguyen",
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
            `SELECT LOAI_DIEN_THOAI.LDT_MA, LDT_TEN, LDT_GIA, HINH_ANH.HA_URL, NHA_SAN_XUAT.NSX_MA
            FROM LOAI_DIEN_THOAI, HINH_ANH, NHA_SAN_XUAT
            WHERE 
                NHA_SAN_XUAT.NSX_MA = LOAI_DIEN_THOAI.NSX_MA
                AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA
            LIMIT ${startPoint}, ${productsPerPage}`,
            function(err, result) {
                if (err) throw new Error('get page error');
                con.end();
                result = result.map(item => {
                    item.LDT_GIA = item.LDT_GIA.toLocaleString('vi-VN');
                    return item;
                });
                res.json(result);
            }
        );
    });
}

module.exports.addBrand = (req, res) => {
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

module.exports.addUnit = (req, res) => {
    let {
        slMa,
        txtIMEI
    } = req.query;

    let con = mysql.createConnection(config);
    con.connect(function(err) {
        if (err) throw err;
        con.query(
            `INSERT INTO DIEN_THOAI(DT_IMEI, LDT_MA)
                    VALUES('${txtIMEI}', '${slMa}')`,
            function(err) {
                let resObj = {};
                if (err)
                    resObj.status = 'error'
                else
                    resObj.status = 'success'
                res.json(resObj);
            }
        );
        con.end();
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

// module.exports.postAddDiscount = (req, res, next) => {
//     try {
//         let {
//             maChuongTrinhKhuyenMai,
//             tenChuongTrinhKhuyenMai,
//             heSoChuongTrinhKhuyenMai,
//             ngayKetThucChuongTrinhKhuyenMai,
//             maSanPhams
//         } = req.query;
//         let produdctIDs = maSanPhams.split(',');
//         con = mysql.createConnection(config);
//         con.connect(err => {
//             con.query(
//                 `INSERT INTO CHUONG_TRINH_KHUYEN_MAI(CTKM_MA, CTKN_TEN, CTKM_NGAYKETTHUC, CTKM_HESO) 
//                     VALUES('${maChuongTrinhKhuyenMai}', '${tenChuongTrinhKhuyenMai}', '${ngayKetThucChuongTrinhKhuyenMai}', ${heSoChuongTrinhKhuyenMai})`,
//                 (err, result) => {
//                     if (err) res.json('ERROR');
//                     res.json('OK');
//                 }
//             );
//             for (let ID in produdctIDs) {
//                 con.query(
//                     `UPDATE LOAI_DIEN_THOAI 
//                     SET CTKM_MA = '${maChuongTrinhKhuyenMai}' 
//                     WHERE LDT_MA = '${ID}'`,
//                     err => {
//                         if (err) {
//                             throw new Error('Add product to discount error');
//                         }
//                     }
//                 );
//             }
//             con.close();
//         });
//     } catch (error) {
//         next(error);
//     }
// }

const formidable = require('formidable');
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
            console.log(`INSERT INTO CHUONG_TRINH_KHUYEN_MAI(CTKM_MA, CTKN_TEN, CTKM_NGAYKETTHUC, CTKM_HESO) 
            VALUES('${maChuongTrinhKhuyenMai}', '${tenChuongTrinhKhuyenMai}', '${ngayKetThucChuongTrinhKhuyenMai}', ${heSoChuongTrinhKhuyenMai})`);
            let con = mysql.createConnection(config);
            con.connect(err => {
                con.query(`INSERT INTO CHUONG_TRINH_KHUYEN_MAI(CTKM_MA, CTKN_TEN, CTKM_NGAYKETTHUC, CTKM_HESO) 
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
                            SET CTKM_MA = '${maChuongTrinhKhuyenMai}' 
                        WHERE LDT_MA = '${ID}'`,
                        err => {
                            if (err) {
                                throw new Error('Add psroduct to discount error');
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