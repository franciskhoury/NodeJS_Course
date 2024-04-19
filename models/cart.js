// imports for working with the file system
const fs = require('fs');
const path = require('path');
const dirname = require('../util/path');
const p = path.join(dirname, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];

      // Add new product / increase quantity
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty++;
        //cart.products = [ ...cart.products]; // Is this necessary?
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [ ...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id,productPrice) {
    fs.readFile(p, (err,fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = {...cart};  // To be fixed - 'cart' needs to be parsed from fileContent
      const product = updatedCart.products.find(prod => prod.id === id);
      updatedCart.products = updatedCart.products.filter(p => p.id !== id);
      updatedCart.totalPrice -= productPrice * product.qty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }
}