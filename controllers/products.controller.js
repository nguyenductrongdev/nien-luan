const mysql = require('mysql');
const fs = require('fs');
const formidable = require('formidable');

module.exports.addBrand = (req, res) => {
    res.render('products/add-brand', {
        title: 'Thêm nhà sản xuất'
    });
}

module.exports.postAddBrand = (req, res, next) => {
    try {
        let form = formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let txtMa = fields.txtMa;
            let txtTen = fields.txtTen;

            let con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "b1709576",
                database: "nienluan"
            });
            con.connect(function (err) {
                if (err) throw err;
                con.query(`INSERT INTO NHA_SAN_XUAT VALUES ('${txtMa}', '${txtTen}')`, function (err) {
                    if (err) throw new Error('add brand err');
                });
                res.send('them thanh cong');
                con.end();
            });
        });
    } catch (error) {
        next(error);
    }
}

module.exports.addProduct = (req, res, next) => {
    try {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "b1709576",
            database: "nienluan"
        });
        con.connect(function (err) {
            if (err) throw err;
            con.query('SELECT * FROM NHA_SAN_XUAT', function (err, result) {
                if (err) throw new Error('login err');
                nhaSanXuatOptions = [];
                for (let i = 0; i < result.length; i++) {
                    nhaSanXuatOptions.push({
                        ma: result[i].NSX_MA,
                        ten: result[i].NSX_TEN
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
                        nhaSanXuatOptions
                    });
                    // khi chua them moi truoc do
                } else {
                    res.render('products/add-product', {
                        title: 'Thêm điện thoại',
                        nhaSanXuatOptions
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
            let txtGia = fields.txtGia;
            let rdLoaiManHinh = fields.rdLoaiManHinh;
            let slDoPhanGiai = fields.slDoPhanGiai;

            let tempPath = files.fHinhAnh.path;
            let dbPath = `/uploads/${txtMa}_${files.fHinhAnh.name}`;

            let dirPath = `./public/uploads/${txtMa}_${files.fHinhAnh.name}`;

            fs.rename(tempPath, dirPath, err => {
                if (err) throw new Error('upload product image error');
            });

            let con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "b1709576",
                database: "nienluan"
            });
            con.connect(function (err) {
                if (err) throw err;

                let qr = `INSERT INTO LOAI_DIEN_THOAI (LDT_MA, NSX_MA, LDT_TEN, 
                    LDT_TEN_CHIP, LDT_DUNG_LUONG_PIN, LDT_DUNG_LUONG_RAM, LDT_DUNG_LUONG_ROM,
                    LDT_THONG_TIN_CUONG_LUC, LDT_JACK_TAI_NGHE, LDT_TOC_DO_SAC, 
                    LDT_GIA, LDT_LOAI_PIN, LDT_LOAI_MAN_HINH, LDT_DO_PHAN_GIAI)
                    VALUES 
                    ('${txtMa}', '${slNhaSanXuat}', '${txtTen}', 
                    '${txtTenChip}', ${txtDungLuongPin}, ${txtDungLuongRAM}, ${txtDungLuongROM}, 
                    '${txtThongTinCuongLuc}', ${rdJackTaiNghe}, ${txtTocDoSac},
                    ${txtGia}, '${rdLoaiPin}', '${rdLoaiManHinh}', '${slDoPhanGiai}')`;
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
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "b1709576",
            database: "nienluan"
        });
        con.connect(function (err) {
            if (err) throw err;
            con.query(
                `SELECT LDT_MA, LDT_TEN, NSX_TEN, LDT_GIA, CTKM_MA 
                FROM NHA_SAN_XUAT, LOAI_DIEN_THOAI
                WHERE NHA_SAN_XUAT.NSX_MA = LOAI_DIEN_THOAI.NSX_MA`,
                function (err, result) {
                    if (err) throw new Error('view product err');
                    res.render('products/view-products', {
                        products: result
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
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "b1709576",
            database: "nienluan"
        });
        con.connect(function (err) {
            if (err) throw err;
            con.query(
                `SELECT LDT_MA, LDT_TEN
                FROM LOAI_DIEN_THOAI`,
                function (err, result) {
                    if (err) throw new Error('add unit err');
                    res.render('products/add-unit', {
                        brands: result
                    });
                }
            );
            con.end();
        });
    } catch (error) {
        next(error);
    }
}

module.exports.postAddUnit = (req, res, next) => {
    try {
        let form = formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let slMa = fields.slMa;
            let txtIMEI = fields.txtIMEI;

            let con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "b1709576",
                database: "nienluan"
            });
            con.connect(function (err) {
                if (err) throw err;
                con.query(
                    `INSERT INTO DIEN_THOAI(DT_IMEI, LDT_MA)
                    VALUES('${txtIMEI}', '${slMa}')`,
                    function (err) {
                        if (err) throw new Error('add unit err');
                        res.redirect('/products/add-unit');
                    }
                );
                con.end();
            });
        });
    } catch (error) {
        next(error);
    }
}

module.exports.viewProduct = (req, res, next) => {
    try {
        const LDT_MA = req.query.LDT_MA;
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "b1709576",
            database: "nienluan"
        });
        con.connect(function (err) {
            if (err) throw err;
            // res.send(`SELECT * FROM LOAI_DIEN_THOAI WHERE LDT_MA='${LDT_MA}'`);
            con.query(
                `SELECT * 
                FROM 
                    LOAI_DIEN_THOAI, NHA_SAN_XUAT, HINH_ANH
                WHERE
                    '${LDT_MA}' = LOAI_DIEN_THOAI.LDT_MA 
                    AND LOAI_DIEN_THOAI.NSX_MA = NHA_SAN_XUAT.NSX_MA
                    AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`,
                function (err, result) {
                    if (err) throw new Error(err);
                    con.end();

                    result[0].LDT_JACK_TAI_NGHE = (result[0].LDT_JACK_TAI_NGHE === 1 ? 'Có' : 'Không');
                    res.render('products/view-product', {
                        title: "Thông tin chi tiết",
                        product: result[0]
                    });
                }
            );
        });
    } catch (error) {
        if (error) next(error);
    }
}