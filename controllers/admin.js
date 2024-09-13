const Product = require("../models/product");

module.exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    imageUrl,
    price,
    description,
    null,
    req.user._id
  );
  product
    .save()
    .then((result) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

module.exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

module.exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      if (!product) return res.redirect("/");
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/products",
        editing: editMode,
        product: product,
      });
    })

    .catch((error) => console.log(error));
};

module.exports.postEditProduct = (req, res, next) => {
  const productId = req.body.id;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const product = new Product(
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription,
    productId
  );
  product
    .save()
    .then((result) => {
      console.log("Product Updated");
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/product-list", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        products: products,
      });
    })
    .catch((error) => console.log(error));
};

module.exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId)
    .then(() => {
      console.log("Product Deleted");
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};
