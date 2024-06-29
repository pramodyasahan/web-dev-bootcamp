require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Product = require('./models/product');

/**
 * Main function to initialize the server and connect to the database.
 */
async function main() {
  const logger = await require('./logger');

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    logger.info('🫦 - Connected to MongoDB');
  } catch (error) {
    logger.error('❌ - Error connecting to MongoDB: ' + error.message);
  }

  const app = express();

  // Middleware to parse JSON bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride('_method')); // To support PUT and DELETE methods

  // Set the views directory and view engine for the application
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  /**
   * GET /api/products
   * Endpoint to fetch all products.
   * Renders a list of products.
   */
  app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find({});
      res.render('products/index', { products });
    } catch (error) {
      logger.error('❌ - Error fetching products: ' + error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  /**
   * GET /api/products/new
   * Endpoint to show a form to create a new product.
   */
  app.get('/api/products/new', (req, res) => {
    res.render('products/new');
  });

  /**
   * POST /api/products
   * Endpoint to add a new product.
   */
  app.post('/api/products', async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      logger.info('🥘 - Making new product');
      res.redirect('/api/products/');
    } catch (error) {
      logger.error('❌ - Error adding new product: ' + error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  /**
   * GET /api/products/:id/edit
   * Endpoint to show a form to edit an existing product.
   */
  app.get('/api/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        logger.warn(`⚠️ - Product not found: ${id}`);
        return res.status(404).send('Product not found');
      }
      res.render('products/edit', { product });
    } catch (error) {
      logger.error(`❌ - Error fetching product for edit: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

  /**
   * PUT /api/products/:id
   * Endpoint to update an existing product.
   */
  app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
      });
      if (!product) {
        logger.warn(`⚠️ - Product not found for update: ${id}`);
        return res.status(404).send('Product not found');
      }
      res.redirect(`/api/products/${product._id}`);
    } catch (error) {
      logger.error(`❌ - Error updating product: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

  /**
   * GET /api/products/:id
   * Endpoint to show a single product.
   */
  app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        logger.warn(`⚠️ - Product not found: ${id}`);
        return res.status(404).send('Product not found');
      }
      res.render('products/show', { product });
    } catch (error) {
      logger.error(`❌ - Error fetching product: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`🚀 - App is listening on port ${port}`);
  });
}

main();
