// imports for working with the file system
const fs = require('fs');
const path = require('path');
const dirname = require('../util/path');
const p = path.join(dirname, 'data', 'products.json');
const Cart = require('./cart');

const getProductsFromFile = cb => {
  // Small file expected, so not using read file instead of using a stream
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        console.log("Saving changes to existing product with id:" + this.id);
        const existingProductIndex = products.findIndex(p => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id=Math.random().toString();
        console.log("Adding a NEW Product with ID = " + this.id);
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById (id) {
    getProductsFromFile(products => {
      const updatedProdcuts = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProdcuts), err => {
        if (!err) {
          // No error: delete product from cart
        }
      });
    });
}

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

}