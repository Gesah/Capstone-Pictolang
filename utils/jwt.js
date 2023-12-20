// jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secret = 'your-secret-key';
  const expiresIn = '1h'; // Sesuaikan dengan kebutuhan
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => {
  const secret = 'your-secret-key';
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verifyToken,
};
