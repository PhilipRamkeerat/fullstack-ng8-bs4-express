const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set collection and schema
let Product = new Schema({
  ProductName: {
    type: String
  },
  ProductDescription: {
    type: String
  },
  ProductPrice: {
    type: Number
  }
},{
    collection: 'Product'
});

module.exports = mongoose.model('Product', Product);
