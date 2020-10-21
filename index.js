const express = require('express');
const app = express();

const usersRoute = require('./routers/users.route');
const productsRoute = require('./routers/products.route');

const apiProductsRoute = require('./api/routers/products.route');

const hbs = require('express-handlebars');
const port = 8080;


app.engine('hbs', hbs({
    extname: 'hbs',
    layoutsDir: './views/layouts/',
    defaultLayout: 'layout'
}));

app.use('/users', usersRoute);
app.use('/products', productsRoute);

app.use('/api/products', apiProductsRoute);

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        throw new Error('index error');
    }
});

app.listen(port, () => console.log('server setup complete'));