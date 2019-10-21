/**
 * Using mongose ORM to save datas in Mongo Database
 */
const express = require('express');
const app = express();
const productRoutes = express.Router();

// Require product model
let Product = require('../models/Product');

// Store Route
// Add endpoint
productRoutes.route('/add').post(function (req, res) {
  let product = new Product(req.body);
  product.save()
    .then(product => {
      res.status(200).json({ 'Product': 'Product has been added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// get endpoint route
productRoutes.route('/').get(function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(products);
    }
  });
});

// Edit route
productRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Product.findById(id, function (err, product) {
    res.json(product);
  });
});

// Update route
productRoutes.route('/update/:id').put(function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (!product)
      res.status(404).send("Record not found");
    else {
      product.productName = req.body.productName;
      product.productDescription = req.body.productDescription;
      product.productPrice = req.body.productPrice;

      console.log('Express => Update:id', product);
      product.save().then(product => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Delete route
productRoutes.route('/delete/:id').delete(function (req, res) {
  Product.findByIdAndRemove({ _id: req.params.id }, function (err, product) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

// Search Route
productRoutes.route('/search/:word').get(function (req, res) {
  let word = req.params.word;
  Product.find({ productName: word }, function (err, product) {
    console.log("Product", product);
    if (err) {
      console.log(err);
    } else {
      res.json(product);
    }
  });
});



module.exports = productRoutes;





