const express = require('express');
const app = express();
const multer = require('multer');
const challengeRoutes = require('./challengeRoutes');
const moduleRoutes = require('./moduleRoutes');
const objectRoutes = require('./objectRoutes');
const packageRoutes = require('./packageRoutes');
const userRoutes = require('./userRoutes');

// Middleware for parsing JSON
app.use(express.json());

// Challenge Routes
app.use('/challenges', challengeRoutes);

// Module Routes
app.use('/modules', moduleRoutes);

// Object Routes
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use('/objects', objectRoutes);

// Package Routes
app.use('/packages', packageRoutes);

// User Routes
app.use('/users', userRoutes);

// Example of a default route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });