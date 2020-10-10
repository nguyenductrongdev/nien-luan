const mysql = require('mysql');

module.exports.postRegister = (req, res, next) => {
    try {
        let txtTenDangNhap = req.body.txtTenDangNhap;
        let txtVaiTro = req.body.hVaiTro;
        let txtMatKhau = req.body.txtMatKhau;
        let txtSoDienThoai = req.body.txtSoDienThoai;
        let txtEmail = req.body.txtEmail;

        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "nienluan"
        });
        con.connect(function (err) {
            if (err) throw err;
            res.send(`${txtTenDangNhap}, ${txtVaiTro},
                ${ txtMatKhau}, ${txtSoDienThoai}, ${txtEmail}`);
            con.query(`INSERT INTO nguoi_dung VALUES('${txtTenDangNhap}', '${txtVaiTro}', 
                '${txtMatKhau}', '${txtSoDienThoai}', '${txtEmail}')`, err => {
                if (err) throw err;
            });
        });
    } catch (error) {
        next(error);
    }
}

module.exports.register = (req, res) => {
    try {
        res.render('users/register');
    } catch (error) {
        next(error);
    }
}

module.exports.login = (req, res, next) => {
    try {
        res.render('users/login');
    } catch (error) {
        next(error);
    }
}

module.exports.postLogin = (req, res, next) => {
    try {
        let txtTenDangNhap = req.body.txtTenDangNhap;
        let txtMatKhau = req.body.txtMatKhau;

        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "nienluan"
        });
        con.connect(function (err) {
            if (err) throw err;
            con.query(`SELECT ND_TEN_DANG_NHAP, ND_MAT_KHAU FROM nguoi_dung 
                WHERE ND_TEN_DANG_NHAP='${txtTenDangNhap}'`, function (err, result) {
                if (err) throw new Error('login err');
                let isExist = result.length === 1;

                if (!isExist) {
                    res.render('users/login', {
                        existErr: true
                    });
                    return;
                }
                else {
                    let isMatchMatKhau = result[0].ND_MAT_KHAU === txtMatKhau;
                    if (isMatchMatKhau) {
                        // res.send('dang nhap thanh cong');
                        res.render('users/index', {
                            username: result[0].ND_TEN_DANG_NHAP
                        })
                    }
                    else {
                        res.render('users/login', {
                            matchMatKhauErr: true
                        });
                        return;
                    }
                }
            });
        });
    } catch (error) {
        next(error);
    }
}

