const express = require('express');
const app = express();
const usersRoute = require('./routers/users.route');
const productsRoute = require('./routers/products.route');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const port = 8080;

app.engine('hbs', hbs({
    extname: 'hbs',
    layoutsDir: './views/layouts/',
    defaultLayout: 'layout'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRoute);
app.use('/products', productsRoute);

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log('server setup complete'));