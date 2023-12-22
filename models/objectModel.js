const admin = require('firebase-admin');

const createObject = async (objectData, photo) => {
  // Validasi data
  if (!objectData.name) {
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
    name: objectData.name,
    photoUrl,
  });

  return objectId;
};

const uploadImage = async (file, objectId) => {
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
  // Update data objek di Realtime Database
  await admin.database().ref(`identifikasi_objek/${objectId}`).update({
    name: objectData.name,
  });
};

const deleteObject = async (objectId) => {
  await admin.database().ref(`identifikasi_objek/${objectId}`).remove();
};

const identifyObject = async () => {
  // Implementasi pengenalan objek berdasarkan data gambar
};

module.exports = {
  createObject,
  getAllObjects,
  getObjectById,
  updateObject,
  deleteObject,
  identifyObject,
};