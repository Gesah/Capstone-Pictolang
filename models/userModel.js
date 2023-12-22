const admin = require('firebase-admin');
const bcryptUtil = require('../utils/bcrypt');

const createUser = async (userData, photo) => {
  const { name, email, password } = userData;

  const hashedPassword = await bcryptUtil.hashPassword(password);

  // Buat ID unik dengan timestamp
  const userId = Date.now().toString();

  // Simpan foto jika ada
  let photoUrl = null;
  if (photo) {
    photoUrl = await uploadImage(photo, userId);
  }

  // Simpan data pengguna pada Firebase Realtime Database
  await admin.database().ref(`users/${userId}`).set({
    name,
    email,
    password: hashedPassword,
    photoUrl,
  });

  // Registrasi pengguna di Firebase Authentication
  await admin.auth().createUser({
    uid: userId,
    email,
    password,
    displayName: name,
  });

  return userId;
};

const uploadImage = async (file, userId) => {
  const bucket = admin.storage().bucket();
  const fileBuffer = file.buffer;
  const fileName = `${userId}_${file.originalname}`;
  const fileUpload = bucket.file(`images/${fileName}`);

  await fileUpload.save(fileBuffer, {
    metadata: {
      contentType: file.mimetype,
    },
  });

  return await fileUpload.getSignedUrl({ action: 'read', expires: '03-09-2099' });
};

const getUserByEmail = async (email) => {
  const snapshot = await admin.database().ref('users').orderByChild('email').equalTo(email).once('value');
  const users = snapshot.val();
  const userId = Object.keys(users)[0];
  return users[userId];
};

const getUserById = async (userId) => {
  const snapshot = await admin.database().ref(`users/${userId}`).once('value');
  return snapshot.val();
};

const getAllUsers = async () => {
  const snapshot = await admin.database().ref('users').once('value');
  return snapshot.val();
};

const updateUser = async (userId, userData) => {
  const { email, password, name } = userData;
  const hashedPassword = await bcryptUtil.hashPassword(password);

  // Update data pengguna di Realtime Database
  await admin.database().ref(`users/${userId}`).update({
    email,
    name,
    password: hashedPassword,
  });
};

const deleteUser = async (userId) => {
  await admin.database().ref(`users/${userId}`).remove();
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};