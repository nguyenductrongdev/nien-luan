const express = require('express');
const app = express();
const hbs = require('express-handlebars')
const usersRoute = require('./routers/users.route');
const bodyParser = require('body-parser');
const port = 8080;

app.engine('hbs', hbs({
    extname: 'hbs',
    layoutsDir: './views/layouts/',
    defaultLayout: 'layout'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/users', usersRoute);

app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log('server setup complete'));