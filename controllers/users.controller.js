const mysql = require('mysql');

module.exports.index = (req, res, next) => {
    try {
        let avatar = req.query.avatar;
        let username = req.query.username;
        res.render('users/index', {
            username,
            avatar
        });
    } catch (error) {
        next(error)
    }
}

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
            let pathAvatar = `/${req.file.path.split('/').slice(1).join('/')}`;

            con.query(`INSERT INTO nguoi_dung VALUES('${txtTenDangNhap}', '${txtVaiTro}', 
                '${txtMatKhau}', '${txtSoDienThoai}', '${txtEmail}', '${pathAvatar}')`, err => {
                if (err) throw err;
            });
            con.end();
            res.redirect(`/users/?username=${txtTenDangNhap}&avatar=${pathAvatar}`);
            return;
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
            con.query(`SELECT ND_TEN_DANG_NHAP, ND_MAT_KHAU, ND_AVATAR FROM nguoi_dung 
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
                        res.redirect(`/users/?username=${result[0].ND_TEN_DANG_NHAP}&avatar=${result[0].ND_AVATAR}`);
                        return;
                    }
                    else {
                        res.render('users/login', {
                            matchMatKhauErr: true
                        });
                        return;
                    }
                }
            });
            con.end();
        });
    } catch (error) {
        next(error);
    }
}

