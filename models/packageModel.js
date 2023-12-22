const admin = require('firebase-admin');

const createPackage = async (packageData) => {
  const packageRef = await admin.database().ref('paket').push(packageData);
  const packageId = packageRef.key;
  return packageId;
};

const getAllPackages = async () => {
  const packagesSnapshot = await admin.database().ref('paket').once('value');
  const packagesData = packagesSnapshot.val() || {};
  return Object.keys(packagesData).map((packageId) => ({ ...packagesData[packageId], id: packageId }));
};

const getPackageById = async (packageId) => {
  const packageSnapshot = await admin.database().ref(`paket/${packageId}`).once('value');
  return packageSnapshot.val();
};

const updatePackage = async (packageId, packageData) => {
  await admin.database().ref(`paket/${packageId}`).update(packageData);
};

const deletePackage = async (packageId) => {
  await admin.database().ref(`paket/${packageId}`).remove();
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};