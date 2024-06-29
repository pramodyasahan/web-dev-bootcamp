require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

async function main() {
  const logger = await require('./logger');

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    logger.info('🫦 - Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB: ' + error.message);
  }

  const app = express();

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.get('/dog', (req, res) => {
    res.send('WOOF!');
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`App is listening on port ${port}`);
  });
}

main();
