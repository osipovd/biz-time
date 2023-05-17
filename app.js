const express = require('express');
const app = express();
const ExpressError = require('./expressError');

// Middleware to parse JSON data
app.use(express.json());

// Import the company and invoice routes
const companiesRoutes = require('./routes/companies');
const invoicesRoutes = require('./routes/invoices');

// Mount the company and invoice routes
app.use('/companies', companiesRoutes);
app.use('/invoices', invoicesRoutes);

// 404 Handler
app.use(function (req, res, next) {
  const err = new ExpressError('Not Found', 404);
  return next(err);
});

// General Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;

