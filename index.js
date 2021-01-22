// console.log(process.env);

const express = require("express");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
const cors = require('cors');

const usersRoute = require("./routers/users.route");
const productsRoute = require("./routers/products.route");
const apiProductsRoute = require("./api/routers/products.route");

const app = express();
const port = 8080;

app.engine("hbs", hbs({
    extname: "hbs",
    layoutsDir: "./views/layouts/",
    defaultLayout: "layout",
}));

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(cors())
app.use(cookieParser());
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/api/products", apiProductsRoute);
app.use(express.static("./public"));

app.get("/", (req, res) => {
    let { username, avatar } = req.cookies;
    try {
        res.render("index", {
            username,
            avatar,
        });
    } catch (error) {
        throw new Error("index error");
    }
});

app.listen(port, () => console.log("server setup complete"));