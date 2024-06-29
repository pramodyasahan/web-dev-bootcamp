require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');

async function main() {
  const logger = await require('./logger');

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    logger.info('Connected to MongoDB');

    // Seed data
    const seedProducts = [
      { name: 'Tomato', price: 0.99, category: 'vegetable' },
      { name: 'Orange', price: 1.49, category: 'fruit' },
      { name: 'Milk', price: 2.99, category: 'dairy' },
      { name: 'Bread', price: 1.99, category: 'bakery' },
      { name: 'Carrot', price: 0.79, category: 'vegetable' },
      { name: 'Apple', price: 1.29, category: 'fruit' },
      { name: 'Cheese', price: 3.99, category: 'dairy' },
      { name: 'Banana', price: 0.59, category: 'fruit' },
    ];

    await Product.insertMany(seedProducts);
    logger.info('Seed data inserted successfully');
  } catch (error) {
    logger.error('Error inserting seed data: ' + error.message);
  } finally {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
  }
}

main();
