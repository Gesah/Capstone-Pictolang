const admin = require('firebase-admin');
const { config } = require('../config/Config');

const createObject = async (objectData, photo) => {
  try {
    const { name } = objectData;
   // Validasi data
   if (!name) {
    throw new Error('Object name is required');
  }

    // Buat ID unik dengan timestamp
    const objectId = Date.now().toString();

    // Simpan foto jika ada
    let photoUrl = null;
    if (photo) {
      photoUrl = await uploadImage(photo, objectId);
    }

    // Simpan data objek pada Firebase Realtime Database
    await admin.database().ref(`identifikasi_objek/${objectId}`).set({
      name,
      photoUrl,
    });

    return objectId;
  } catch (error) {
    throw error;
  }
}; 

const uploadImage = async (file, objectId) => {
  try {
    const bucket = admin.storage().bucket();
    const fileBuffer = file.buffer;
    const fileName = `${objectId}_${file.originalname}`;
    const fileUpload = bucket.file(`images/${fileName}`);

    await fileUpload.save(fileBuffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    return await fileUpload.getSignedUrl({ action: 'read', expires: '03-09-2099' });
  } catch (error) {
    throw error;
  }
};


const getAllObjects = async () => {
  const snapshot = await admin.database().ref('identifikasi_objek').once('value');
  return snapshot.val();
};

const getObjectById = async (objectId) => {
  const snapshot = await admin.database().ref(`identifikasi_objek/${objectId}`).once('value');
  return snapshot.val();
};

const updateObject = async (objectId, objectData) => {
  const { name } = objectData;

  // Update data objek di Realtime Database
  await admin.database().ref(`identifikasi_objek/${objectId}`).update({
    name,
  });
};

const deleteObject = async (objectId) => {
  await admin.database().ref(`identifikasi_objek/${objectId}`).remove();
};

const identifyObject = async (imageData) => {
};

module.exports = {
  createObject,
  getAllObjects,
  getObjectById,
  updateObject,
  deleteObject,
  identifyObject,
};
