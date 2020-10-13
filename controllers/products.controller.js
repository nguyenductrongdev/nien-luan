const mysql = require('mysql');
const { options } = require('../routers/users.route');

module.exports.addBrand = (req, res) => {
    res.render('products/add-brand', {
        title: 'Thêm nhà sản xuất'
    });
}

module.exports.postAddBrand = (req, res, next) => {
    try {
        let txtMa = req.body.txtMa;
        let txtTen = req.body.txtTen;

        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "nienluan"
        });
        con.connect(function (err) {
            if (err) throw err;
            con.query(`INSERT INTO NHA_SAN_XUAT VALUES ('${txtMa}', '${txtTen}')`, function (err) {
                if (err) throw new Error('login err');
            });
            res.send('them thanh cong');
            con.end();
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
            password: "",
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
        let txtMa = req.body.txtMa;
        let txtTen = req.body.txtTen;
        let slNhaSanXuat = req.body.slNhaSanXuat;
        let txtTenChip = req.body.txtTenChip;
        let rdJackTaiNghe = req.body.rdJackTaiNghe;
        let rdLoaiPin = req.body.rdLoaiPin;
        let txtDungLuongPin = req.body.txtDungLuongPin;
        let txtTocDoSac = req.body.txtTocDoSac;
        let txtDungLuongRAM = req.body.txtDungLuongRAM;
        let txtDungLuongROM = req.body.txtDungLuongROM;
        let txtThongTinCuongLuc = req.body.txtThongTinCuongLuc;
        let txtGia = req.body.txtGia;
        let rdLoaiManHinh = req.body.rdLoaiManHinh;
        let slDoPhanGiai = req.body.slDoPhanGiai;

        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
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
            con.query(qr, function (err, result) {
                let isExist = false;
                if (err) {
                    isExist = true;
                    // throw new Error('add product err');
                }
                res.redirect(`/products/add-product?isExist=${isExist}`);
            });
            con.end();
        });
    } catch (error) {
        next(error);
    }
}

module.exports.