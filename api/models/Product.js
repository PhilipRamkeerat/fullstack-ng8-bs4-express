const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set collection and schema
let Product = new Schema({
  productName: {
    type: String
  },
  productDescription: {
    type: String
  },
  productPrice: {
    type: Number
  }
}, {
  collection: 'Product'
});

module.exports = mongoose.model('Product', Product);
