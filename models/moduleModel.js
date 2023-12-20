const admin = require('firebase-admin');
const { config } = require('../config/Config');

const createModule = async (moduleData) => {
  const moduleRef = await admin.database().ref('modul').push(moduleData);
  const moduleId = moduleRef.key;
  return moduleId;
};

const getAllModules = async () => {
  const modulesSnapshot = await admin.database().ref('modul').once('value');
  const modulesData = modulesSnapshot.val() || {};
  return Object.keys(modulesData).map((moduleId) => ({ ...modulesData[moduleId], id: moduleId }));
};

const getModuleById = async (moduleId) => {
  const moduleSnapshot = await admin.database().ref(`modul/${moduleId}`).once('value');
  return moduleSnapshot.val();
};

const updateModule = async (moduleId, moduleData) => {
  await admin.database().ref(`modul/${moduleId}`).update(moduleData);
};

const deleteModule = async (moduleId) => {
  await admin.database().ref(`modul/${moduleId}`).remove();
};

module.exports = {
  createModule,
  getAllModules,
  getModuleById,
  updateModule,
  deleteModule,
};
