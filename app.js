const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const { config, initializeFirebaseApp } = require('./config/Config');

initializeFirebaseApp();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const verifyToken = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization || req.headers.Authorization;
    if (!idToken) {
      throw new Error('Unauthorized');
    }

    // Menggunakan 'Bearer ' sebagai awalan token
    const decodedToken = await admin.auth().verifyIdToken(idToken.replace('Bearer ', ''));
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized' });
  }
};



// Contoh penggunaan middleware
app.get('/secure-route', verifyToken, (req, res) => {
  res.json({ message: 'This is a secure route', user: req.user });
}); 

// Import your route modules
const challengeRoutes = require('./routes/challengeRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const objectRoutes = require('./routes/objectRoutes');
const packageRoutes = require('./routes/packageRoutes');
const userRoutes = require('./routes/userRoutes');

// Use the route modules
app.use('/challenges', challengeRoutes);
app.use('/modules', moduleRoutes);
app.use('/objects', objectRoutes);
app.use('/packages', packageRoutes);
app.use('/users', userRoutes);

app.use('*', (_, res) => {
  res.status(404).json({ message: '404 Not Found' });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
