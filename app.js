const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/404");
const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
