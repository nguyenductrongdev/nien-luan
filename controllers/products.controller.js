const mysql = require('mysql');
const fs = require('fs');
const formidable = require('formidable');
const { query } = require('express');
const loaiDienThoaiModel = require('./../models/loaiDienThoai.model');
const dienThoaiModel = require('./../models/dienThoai.model');
const hoaDonBanModel = require('./../models/hoaDonBan.model');

// const config = {
//     host: "localhost",
//     user: "trongnguyen",
//     password: "trongnguyen",
//     database: "nienluan",
//     multipleStatements: true
// }

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "nienluan",
    multipleStatements: true
}

module.exports.addBrand = (req, res) => {
    res.render('products/add-brand', {
        title: 'Thêm nhà sản xuất',
        layout: 'admin',
        username: req.cookies.username,
        avatar: req.cookies.avatar
    });
}

module.exports.addProduct = (req, res, next) => {
    try {
        let con = mysql.createConnection(config);
        con.connect(function(err) {
            if (err) throw err;
            con.query('SELECT * FROM NHA_SAN_XUAT', function(err, result) {
                if (err) throw new Error('add product err');
                nhaSanXuatOptions = [];
                for (let i = 0; i < result.length; i++) {
                    nhaSanXuatOptions.push({
                        ma: result[i].NSX_MA,
                        ten: result[i].NSX_TEN,
                    });
                }

                /*
                    truong hop quay lai khi vua them xong thi 
                    nhan vao isExist cua lan them truoc truyen vao 
                */
                isExist = req.query.isExist;
                // chuyen kieu string thanh boolean
                if (isExist) isExist = (isExist == "true")

                addStatus = {}
                if (isExist) addStatus.err = true;
                else addStatus.success = true;

                // neu da them moi truoc do
                if (isExist !== undefined) {
                    res.render('products/add-product', {
                        title: 'Thêm điện thoại',
                        addStatus,
                        nhaSanXuatOptions,
                        username: req.cookies.username,
                        avatar: req.cookies.avatar,
                        layout: 'admin'
                    });
                    // khi chua them moi truoc do
                } else {
                    res.render('products/add-product', {
                        title: 'Thêm điện thoại',
                        nhaSanXuatOptions,
                        layout: 'admin',
                        username: req.cookies.username,
                        avatar: req.cookies.avatar
                    });
                }
            });
            con.end();
        });
    } catch (error) {
        next(error);
    }
}

module.exports.postAddProduct = (req, res, next) => {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let txtMa = fields.txtMa;
            let txtTen = fields.txtTen;
            let slNhaSanXuat = fields.slNhaSanXuat;
            let txtTenChip = fields.txtTenChip;
            let rdJackTaiNghe = fields.rdJackTaiNghe;
            let rdLoaiPin = fields.rdLoaiPin;
            let txtDungLuongPin = fields.txtDungLuongPin;
            let txtTocDoSac = fields.txtTocDoSac;
            let txtDungLuongRAM = fields.txtDungLuongRAM;
            let txtDungLuongROM = fields.txtDungLuongROM;
            let txtThongTinCuongLuc = fields.txtThongTinCuongLuc;
            let txtGiaMua = fields.txtGiaMua;
            let txtGia = fields.txtGia;
            let rdLoaiManHinh = fields.rdLoaiManHinh;
            let slDoPhanGiai = fields.slDoPhanGiai;
            let txtMoTa = fields.txtMoTa;

            let tempPath = files.fHinhAnh.path;
            let dbPath = `/uploads/${txtMa}_${files.fHinhAnh.name}`;

            let dirPath = `./public/uploads/${txtMa}_${files.fHinhAnh.name}`;

            fs.rename(tempPath, dirPath, err => {
                if (err) throw new Error('upload product image error');
            });

            let con = mysql.createConnection(config);
            con.connect(function(err) {
                if (err) throw err;

                let qr = `INSERT INTO LOAI_DIEN_THOAI (LDT_MA, NSX_MA, LDT_TEN, 
                    LDT_TEN_CHIP, LDT_DUNG_LUONG_PIN, LDT_DUNG_LUONG_RAM, LDT_DUNG_LUONG_ROM,
                    LDT_THONG_TIN_CUONG_LUC, LDT_JACK_TAI_NGHE, LDT_TOC_DO_SAC, LDT_GIA_MUA,
                    LDT_GIA, LDT_LOAI_PIN, LDT_LOAI_MAN_HINH, LDT_DO_PHAN_GIAI, LDT_MO_TA)
                    VALUES 
                    ('${txtMa}', '${slNhaSanXuat}', '${txtTen}', 
                    '${txtTenChip}', ${txtDungLuongPin}, ${txtDungLuongRAM}, ${txtDungLuongROM}, 
                    '${txtThongTinCuongLuc}', ${rdJackTaiNghe}, ${txtTocDoSac}, ${txtGiaMua},
                    ${txtGia}, '${rdLoaiPin}', '${rdLoaiManHinh}', '${slDoPhanGiai}', '${txtMoTa}')`;
                console.log(qr);
                con.query(qr, err => {
                    let isExist = false;
                    if (err) {
                        isExist = true;
                        res.redirect(`/products/add-product?isExist=${isExist}`);
                        con.end();
                        return;
                    }
                    con.query(
                        `INSERT INTO HINH_ANH(HA_URL, LDT_MA) VALUES('${dbPath}', '${txtMa}')`,
                        err => {
                            con.end();
                            if (err) throw new Error('add image image');
                            res.redirect(`/products/add-product?isExist=${isExist}`);
                        }
                    );
                });
            });
        });
    } catch (error) {
        next(error);
    }
}

module.exports.viewProducts = (req, res, next) => {
    try {
        let con = mysql.createConnection(config);
        con.connect(function(err) {
            if (err) throw err;
            con.query(
                `SELECT
                    DISTINCT LOAI_DIEN_THOAI.LDT_MA,
                    LOAI_DIEN_THOAI.LDT_TEN,
                    HINH_ANH.HA_URL,
                    LOAI_DIEN_THOAI.LDT_GIA,
                    IF(LOAI_DIEN_THOAI.CTKM_MA IS NULL, 0, ROUND(CHUONG_TRINH_KHUYEN_MAI.CTKM_HE_SO, 1)) as CTKM_HE_SO,
                    LOAI_DIEN_THOAI.CTKM_MA
                FROM
                    LOAI_DIEN_THOAI, CHUONG_TRINH_KHUYEN_MAI, HINH_ANH
                WHERE
                    (LOAI_DIEN_THOAI.CTKM_MA = CHUONG_TRINH_KHUYEN_MAI.CTKM_MA
                    OR LOAI_DIEN_THOAI.CTKM_MA IS NULL)
                    AND HINH_ANH.LDT_MA = LOAI_DIEN_THOAI.LDT_MA
                    AND (LOAI_DIEN_THOAI.CTKM_MA = CHUONG_TRINH_KHUYEN_MAI.CTKM_MA
                    OR LOAI_DIEN_THOAI.CTKM_MA IS null)`,
                function(err, result) {
                    if (err) throw new Error('view product err');
                    res.render('products/view-products', {
                        products: result = result.map(product => {
                            product.LDT_GIA_DISCOUNTED = product.LDT_GIA - (product.LDT_GIA * product.CTKM_HE_SO);
                            product.LDT_GIA_DISCOUNTED = product.LDT_GIA_DISCOUNTED.toLocaleString('vi');
                            product.LDT_GIA = product.LDT_GIA.toLocaleString('vi');
                            return product;
                        }),
                        layout: 'admin',
                        username: req.cookies.username,
                        avatar: req.cookies.avatar
                    });
                }
            );

            con.end();
        });
    } catch (error) {
        next(error);
    }
}

module.exports.addUnit = (req, res, next) => {
    try {
        let con = mysql.createConnection(config);
        con.connect(function(err) {
            if (err) throw err;
            con.query(
                `SELECT LDT_MA, LDT_TEN
                FROM LOAI_DIEN_THOAI`,
                function(err, result) {
                    if (err) throw new Error('add unit err');
                    res.render('products/add-unit', {
                        brands: result,
                        username: req.cookies.username,
                        avatar: req.cookies.avatar,
                        layout: 'admin'
                    });
                }
            );
            con.end();
        });
    } catch (error) {
        next(error);
    }
}

module.exports.viewProduct = (req, res, next) => {
    try {
        const LDT_MA = req.query.LDT_MA;
        loaiDienThoaiModel.getByLDT_MA(LDT_MA, (err, result) => {
            console.log(result);
            if (err) throw new Error(err);
            result[0].LDT_JACK_TAI_NGHE = (result[0].LDT_JACK_TAI_NGHE === 1 ? 'Có' : 'Không');
            result[0].LDT_GIA_DISCOUNTED = result[0].LDT_GIA - (result[0].LDT_GIA * result[0].CTKM_HE_SO);

            result[0].LDT_GIA = result[0].LDT_GIA.toLocaleString('vi-VN');
            result[0].LDT_GIA_DISCOUNTED = result[0].LDT_GIA_DISCOUNTED.toLocaleString('vi-VN');

            res.render('products/view-product', {
                title: "Thông tin chi tiết",
                username: req.cookies.username,
                avatar: req.cookies.avatar,
                product: result[0],
                username: req.cookies.username,
                avatar: req.cookies.avatar
            });
        });

    } catch (error) {
        if (error) next(error);
    }
}

module.exports.editProduct = (req, res, next) => {
    try {
        const LDT_MA = req.query.LDT_MA;
        let con = mysql.createConnection(config);

        con.connect(function(err) {
            if (err) throw new Error(err);
            con.query(
                `SELECT *
                FROM 
                    LOAI_DIEN_THOAI, NHA_SAN_XUAT, HINH_ANH
                WHERE
                    '${LDT_MA}' = LOAI_DIEN_THOAI.LDT_MA 
                    AND LOAI_DIEN_THOAI.NSX_MA = NHA_SAN_XUAT.NSX_MA
                    AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA;
                SELECT * 
                FROM 
                    NHA_SAN_XUAT`,
                function(err, result) {
                    let productInfo = result[0];
                    let providerInfo = result[1];
                    if (err) throw new Error(err);
                    con.end();

                    productInfo[0].LDT_JACK_TAI_NGHE = (productInfo[0].LDT_JACK_TAI_NGHE === 1 ? 'Có' : 'Không');
                    res.render('products/edit-product', {
                        title: "Sửa sản phẩm",
                        username: req.cookies.username,
                        avatar: req.cookies.avatar,
                        product: productInfo[0],
                        username: req.cookies.username,
                        avatar: req.cookies.avatar,
                        nhaSanXuatOptions: providerInfo
                    });
                }
            );
        });
    } catch (error) {
        if (error) next(error);
    }
}

module.exports.postEditProduct = (req, res, next) => {
    try {
        let form = formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) throw new Error(err);
            let {
                txtMa,
                txtTen,
                slNhaSanXuat,
                txtTenChip,
                rdJackTaiNghe,
                rdLoaiPin,
                txtDungLuongPin,
                txtTocDoSac,
                txtDungLuongRAM,
                txtDungLuongROM,
                txtThongTinCuongLuc,
                txtGiaMua,
                txtGia,
                rdLoaiManHinh,
                slDoPhanGiai,
                txtMoTa
            } = fields;
            let con = mysql.createConnection(config);
            con.connect(err => {
                if (err) throw new Error(err);
                con.query(
                    `UPDATE LOAI_DIEN_THOAI
                    SET
                        NSX_MA = '${slNhaSanXuat}',
                        LDT_TEN = '${txtTen}',
                        LDT_TEN_CHIP = '${txtTenChip}',
                        LDT_DUNG_LUONG_PIN = ${txtDungLuongPin},
                        LDT_DUNG_LUONG_RAM = ${txtDungLuongRAM},
                        LDT_DUNG_LUONG_ROM = ${txtDungLuongROM},
                        LDT_THONG_TIN_CUONG_LUC = '${txtThongTinCuongLuc}',
                        LDT_JACK_TAI_NGHE = ${rdJackTaiNghe},
                        LDT_TOC_DO_SAC = ${txtTocDoSac},
                        LDT_GIA_MUA = ${txtGiaMua},
                        LDT_GIA = ${txtGia},
                        LDT_LOAI_PIN = '${rdLoaiPin}',
                        LDT_LOAI_MAN_HINH = '${rdLoaiManHinh}',
                        LDT_DO_PHAN_GIAI = '${slDoPhanGiai}',
                        LDT_MO_TA = '${txtMoTa}'
                    WHERE LDT_MA = '${txtMa}'`,
                    (err, result) => {
                        if (err) throw new Error(err);
                    });
                if (files.fHinhAnh.name !== '') {
                    let tempPath = files.fHinhAnh.path;
                    let productImagesPath = '/uploads'

                    let dbPath = `${productImagesPath}/${txtMa}_${files.fHinhAnh.name}`;
                    let savePath = `./public/uploads/${txtMa}_${files.fHinhAnh.name}`;

                    fs.rename(tempPath, savePath, err => {
                        if (err) throw new Error('upload product image error');
                    });

                    con.query(`
                        SELECT  HA_URL
                        FROM    HINH_ANH
                        WHERE   LDT_MA = '${txtMa}'
                    `, (err, result) => {
                        if (err) throw new Error(err);
                        let oldURL = result[0].HA_URL;
                        // del old image
                        fs.unlink(`./public${oldURL}`, err => {
                            if (err) throw new Error(err);
                            // set new URL of product image
                            con.query(
                                `UPDATE HINH_ANH
                                SET 
                                    HA_URL = '${dbPath}'
                                WHERE
                                    LDT_MA = '${txtMa}'`
                            );
                        });
                    })
                }
                res.redirect('/products/view-products');
            });
        });
    } catch (error) {
        next(error);
    }
}

module.exports.addBill = (req, res, next) => {
    try {
        let con = mysql.createConnection(config);
        con.connect(err => {
            if (err) throw new Error(err);
            con.query('SELECT * FROM LOAI_DIEN_THOAI', (err, result) => {
                if (err) throw new Error(err);
                res.render('products/add-bill', {
                    products: result,
                    username: req.cookies.username,
                    avatar: req.cookies.avatar,
                    layout: 'admin'
                });
            });
        });
    } catch (error) {
        next(error)
    }
}



module.exports.addDiscount = (req, res) => {
    let con = mysql.createConnection(config);
    con.connect(err => {
        if (err) throw new Error(err);
        con.query('SELECT * FROM LOAI_DIEN_THOAI WHERE CTKM_MA IS NULL', (err, result) => {
            if (err) throw new Error(err);
            res.render('products/add-discount', {
                products: result,
                username: req.cookies.username,
                avatar: req.cookies.avatar,
                layout: 'admin'
            });
        });
    });
}

module.exports.viewDiscounts = (req, res, next) => {
    try {
        let con = mysql.createConnection(config);
        con.connect(err => {
            if (err) throw new Error(err);
            con.query(`SELECT * FROM CHUONG_TRINH_KHUYEN_MAI`, (err, field) => {
                res.render('products/view-discounts', {
                    discounts: field,
                    username: req.cookies.username,
                    avatar: req.cookies.avatar,
                    layout: 'admin',
                });
                con.end();
            });
        });
    } catch (error) {
        next(error)
    }
}

module.exports.viewDiscount = (req, res, next) => {
    try {
        let { ma } = req.query
        let con = mysql.createConnection(config);
        con.connect(err => {
            if (err) throw new Error(err);
            con.query(
                `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI WHERE CTKM_MA = '${ma}';
                SELECT * FROM LOAI_DIEN_THOAI WHERE CTKM_MA =  '${ma}'`,
                (err, fields) => {
                    if (err) throw new Error(err);
                    // console.log([...fields[1]]);
                    let ctkm_heso = fields[0][0].CTKM_HE_SO;
                    fields[1] = fields[1].map(row => {
                        row['LDT_GIA_DISCOUNTED'] = row.LDT_GIA - (row.LDT_GIA * ctkm_heso);
                        return row;
                    })
                    res.render('products/view-discount', {
                        discount: fields[0][0],
                        products: fields[1].map(product => {
                            product.LDT_GIA = product.LDT_GIA.toLocaleString('vi');
                            product.LDT_GIA_DISCOUNTED = product.LDT_GIA_DISCOUNTED.toLocaleString('vi');
                            return product;
                        }),
                        username: req.cookies.username,
                        avatar: req.cookies.avatar,
                        layout: 'admin'
                    });
                    con.end();
                }
            );
        });
    } catch (error) {
        next(error);
    }
}

module.exports.editDiscount = (req, res, next) => {
    try {
        try {
            let { ma } = req.query
            let con = mysql.createConnection(config);
            con.connect(err => {
                if (err) throw new Error(err);
                con.query(
                    `SELECT * FROM CHUONG_TRINH_KHUYEN_MAI WHERE CTKM_MA = '${ma}';
                    SELECT * FROM LOAI_DIEN_THOAI WHERE CTKM_MA = '${ma}';
                    SELECT * FROM LOAI_DIEN_THOAI WHERE CTKM_MA IS NULL`,
                    (err, fields) => {
                        if (err) throw new Error(err);
                        let ctkm_heso = fields[0][0].CTKM_HE_SO;
                        fields[1] = fields[1].map(row => {
                            row['LDT_GIA_DISCOUNTED'] = row.LDT_GIA - (row.LDT_GIA * ctkm_heso);
                            return row;
                        })
                        res.render('products/edit-discount', {
                            discount: fields[0][0],
                            productsDiscounted: fields[1],
                            productsDiscountable: fields[2],
                            layout: 'admin'
                        });
                        con.end();
                    }
                );
            });
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

module.exports.deleteDiscount = (req, res, next) => {
    try {
        let { ma } = req.query;
        let con = mysql.createConnection(config);
        con.connect(err => {
            if (err) throw new Error(err);
            con.query(
                `UPDATE LOAI_DIEN_THOAI SET CTKM_MA = ${null} WHERE CTKM_MA = '${ma}';
                DELETE FROM CHUONG_TRINH_KHUYEN_MAI WHERE CTKM_MA = '${ma}'`,
                (err) => {
                    if (err) throw new Error(err);
                    res.redirect('/products/view-discounts');
                }
            );
        });
    } catch (error) {
        next(error);
    }
}

module.exports.deleteProduct = (req, res, next) => {
    try {
        let { LDT_MA } = req.query;
        let con = mysql.createConnection(config);
        con.connect(err => {
            if (err) throw new Error(err);
            con.query(`
                    SELECT HA_URL FROM HINH_ANH WHERE LDT_MA = '${LDT_MA}';
                    DELETE FROM DIEN_THOAI WHERE LDT_MA = '${LDT_MA}';
                    DELETE FROM HINH_ANH WHERE LDT_MA = '${LDT_MA}';
                    DELETE FROM LOAI_DIEN_THOAI WHERE LDT_MA = '${LDT_MA}'`,
                (err, fields) => {
                    if (err) throw new Error(err);
                    let oldURL = fields[0][0].HA_URL;
                    fs.unlink(`./public${oldURL}`, err => {
                        if (err) throw new Error(err);
                    });

                    res.redirect('/products/view-products');
                }
            );
        });
    } catch (error) {
        next(error);
    }
}