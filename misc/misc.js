const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nghiencuu",
    multipleStatements: true
});

con.query('SELECT register_date FROM account', (err, result) => {
    if (err) console.log(err);
    let a = result[0];
    let hihi = a.register_date;
    console.log(hihi, typeof hihi);

    // console.log(new Date(hihi).toLocaleDateString('vi'));
    console.log(hihi.toLocaleDateString('vi'));
    con.destroy()

    console.log("=============================================================");
});