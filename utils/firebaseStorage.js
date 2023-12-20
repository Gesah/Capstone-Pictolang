const admin = require('firebase-admin');
const { config } = require('../config/Config');

// Fungsi untuk mengunggah gambar ke Firebase Storage
const uploadImageToStorage = async (imageData, folderName) => {
  const bucket = admin.storage().bucket();
  const fileName = `${folderName}/${Date.now()}_${Math.floor(Math.random() * 1000)}.png`;

  const file = bucket.file(fileName);
  await file.save(imageData, {
    metadata: {
      contentType: 'image/png', // Ganti dengan tipe konten yang sesuai
    },
  });

  const url = `https://storage.googleapis.com/${config.storageBucket}/${fileName}`;
  return url;
};

module.exports = {
  uploadImageToStorage,
};
