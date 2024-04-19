const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
  // const editMode = req.query.edit;
  // if (!editMode) {
  //   return res.redirect('/');
  // }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');  // TODO: return error message to user
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product,
      editing: true
    });

  });
}

exports.postEditProduct = (req,res,next) => {
  const prodId = req.body.productId;
  const updTitle = req.body.title;
  const updPrice = req.body.price;
  const updDesc = req.body.description;
  const updImageUrl = req.body.imageUrl;
  const updProduct = new Product(prodId,updTitle,updImageUrl,updDesc,updPrice);
  updProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      pageTitle: 'All Products',
      prods: products,
      path: '/admin/products'
    });
  });
}

exports.postDeleteProduct = (req,res,next) => {
  const prodId = req.body.productId;

  res.redirect('/admin/products');
};