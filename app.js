const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// const errorsController = require("./controllers/errors.js");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("66e19aa43d4f44db19ca6e75")
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// app.use(errorsController.get404);

mongoConnect(() => {
  app.listen(3000);
});
