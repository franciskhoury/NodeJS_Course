const Product = require ('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req,res,next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      pageTitle: 'Shop',
      prods: products,
      path: '/'
    });
  });
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      pageTitle: 'Products',
      prods: products,
      path: '/products'
    });
  });
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail',{
      pageTitle: product.title,
      product: product,
      path: '/products'
    });
  });
}

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}

  exports.getCart = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/cart', {
        pageTitle: 'Your Shopping Cart', 
        prods: products,
        path: '/cart'
      });
    });
  }

  exports.getOrders = (req, res, next) => {
      res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
      });
    };

  exports.getCheckout = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/checkout', {
        pageTitle: 'Checkout',
        prods: products,
        path: '/checkout'
      });
    });
  }
