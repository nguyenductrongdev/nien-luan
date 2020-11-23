const mysql = require('mysql');
const fs = require('fs');
const formidable = require('formidable');

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

module.exports.index = (req, res, next) => {
    try {
        let avatar = req.query.avatar || req.cookies.avatar;
        let username = req.query.username || req.cookies.username;
        if (username == 'admin') {
            res.render('users/index', {
                username,
                avatar,
                layout: 'admin'
            });
        } else {
            res.render('users/index', {
                username,
                avatar
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports.postRegister = (req, res, next) => {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let txtTenDangNhap = fields.txtTenDangNhap;
            let txtVaiTro = fields.hVaiTro;
            let txtMatKhau = fields.txtMatKhau;
            let txtSoDienThoai = fields.txtSoDienThoai;
            let txtEmail = fields.txtEmail;
            let tempPath = files.fAvatar.path;
            let dbPath = `/uploads/${txtTenDangNhap}_${files.fAvatar.name}`;

            fs.rename(tempPath, `./public/uploads/${txtTenDangNhap}_${files.fAvatar.name}`, err => {
                if (err) throw new Error('upload avatar error');
            });

            let con = mysql.createConnection(config);
            con.connect(function(err) {
                if (err) throw err;

                con.query(`INSERT INTO NGUOI_DUNG VALUES('${txtTenDangNhap}', '${txtVaiTro}', 
                '${txtMatKhau}', '${txtSoDienThoai}', '${txtEmail}', '${dbPath}')`, err => {
                    if (err) throw err;
                });
                con.end();
                res.redirect(`/users?username=${txtTenDangNhap}&avatar=${dbPath}`);
                return;
            });
        });
    } catch (error) {
        next(error);
    }
}

module.exports.register = (req, res, next) => {
    try {
        res.render('users/register', {
            title: "Đăng ký"
        });
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
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {

            let txtTenDangNhap = fields.txtTenDangNhap;
            let txtMatKhau = fields.txtMatKhau;

            let con = mysql.createConnection(config);
            con.connect(function(err) {
                if (err) throw err;
                con.query(
                    `SELECT ND_TEN_DANG_NHAP, ND_MAT_KHAU, ND_AVATAR, VT_MA 
                    FROM NGUOI_DUNG 
                    WHERE ND_TEN_DANG_NHAP='${txtTenDangNhap}'`,
                    function(err, result) {
                        if (err) throw new Error('login err');
                        let isExist = result.length === 1;

                        if (!isExist) {
                            res.render('users/login', {
                                existErr: true
                            });
                            return;
                        } else {
                            let isMatchMatKhau = result[0].ND_MAT_KHAU === txtMatKhau;
                            if (isMatchMatKhau) {
                                res.cookie('username', `${result[0].ND_TEN_DANG_NHAP}`);
                                res.cookie('avatar', `${result[0].ND_AVATAR}`);
                                res.redirect('/');
                            } else {
                                res.render('users/login', {
                                    matchMatKhauErr: true
                                });
                                return;
                            }
                        }
                    });
                con.end();
            });
        });
    } catch (error) {
        next(error);
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('username');
    res.clearCookie('avatar');
    res.redirect('/');
}