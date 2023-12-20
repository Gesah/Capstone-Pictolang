// middleware/authentication.js
const admin = require('firebase-admin');

const authentication = async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    if (!idToken) {
      throw new Error('Unauthorized');
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('Decoded Token:', decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(401).json({ error: 'Invalid token or unauthorized access' });
  }
};

module.exports = {
  authentication,
};
