const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();

// Baca kunci privat dari file .env dan ganti \n dengan karakter baris baru sesungguhnya
const private_key = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
console.log(private_key);

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: private_key,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

const config = {
  firebase: {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  },
};

function initializeFirebaseApp() {
  try {
    admin.initializeApp(config.firebase);
    console.log('Firebase app initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase app:', error);
  }
}

module.exports = { config, initializeFirebaseApp };
