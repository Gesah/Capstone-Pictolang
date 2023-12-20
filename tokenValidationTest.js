const { config, initializeFirebaseApp } = require('./config/Config');
initializeFirebaseApp();

const admin = require('firebase-admin');

// Fungsi untuk memvalidasi token
const verifyFirebaseToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // Token valid, decodedToken berisi informasi pengguna
    console.log('Decoded Token:', decodedToken);
    return decodedToken;
  } catch (error) {
    // Kesalahan validasi token
    console.error('Token Validation Error:', error);
    throw error;
  }
};

// Contoh penggunaan fungsi untuk memvalidasi token
const tokenToValidate = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNzAzMDM3Mzc0ODM3IiwiaWF0IjoxNzAzMDM3NTEyLCJleHAiOjE3MDMwNDExMTJ9.DroZDH1J2X1AKMvPqnG-podg-fZqHt7g7W5M9jEUKQk'; // Gantilah dengan token yang akan divalidasi
verifyFirebaseToken(tokenToValidate)
  .then((decodedToken) => {
    // Lakukan tindakan setelah token divalidasi
    console.log('Token valid, aksi setelah validasi:', decodedToken);
  })
  .catch((error) => {
    // Tangani kesalahan validasi token
    console.error('Error setelah validasi token:', error);
  });
