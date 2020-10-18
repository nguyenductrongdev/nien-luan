const express = require('express');
const app = express();
const usersRoute = require('./routers/users.route');
const productsRoute = require('./routers/products.route');
const hbs = require('express-handlebars');
const port = 8080;


app.engine('hbs', hbs({
    extname: 'hbs',
    layoutsDir: './views/layouts/',
    defaultLayout: 'layout'
}));

app.use('/users', usersRoute);
app.use('/products', productsRoute);

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('./public'));

const mysql = require('mysql');
app.get('/', (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        throw new Error('index error');
    }
});

///////////////////////
app.get('/api', (req, res) => {
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
                `SELECT LOAI_DIEN_THOAI.LDT_MA, LDT_TEN, LDT_GIA, HINH_ANH.HA_URL, NHA_SAN_XUAT.NSX_MA
                FROM LOAI_DIEN_THOAI, HINH_ANH, NHA_SAN_XUAT
                WHERE 
                    NHA_SAN_XUAT.NSX_MA = LOAI_DIEN_THOAI.NSX_MA
                    AND LOAI_DIEN_THOAI.LDT_MA = HINH_ANH.LDT_MA`
                , (err, result) => {
                    if (err) throw err;
                    con.end();
                    result = result.map(item => {
                        item.LDT_GIA = item.LDT_GIA.toLocaleString('vi-VN');
                        return item;
                    });
                    res.json(result);
                }
            );
        });
    } catch (error) {
        throw new Error('index error');
    }
});
/////////////////////////

app.listen(port, () => console.log('server setup complete'));