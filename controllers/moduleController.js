// moduleController.js
const moduleModel = require('../models/moduleModel');

const createModule = async (req, res) => {
  try {
    const moduleData = req.body;
    const moduleId = await moduleModel.createModule(moduleData);
    res.status(201).json({ message: 'Modul berhasil dibuat', moduleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal membuat modul' });
  }
};

const getAllModules = async (req, res) => {
  try {
    const modules = await moduleModel.getAllModules();
    res.status(200).json(modules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mendapatkan modul' });
  }
};

const getModuleById = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const moduleData = await moduleModel.getModuleById(moduleId);
    if (moduleData) {
      res.status(200).json(moduleData);
    } else {
      res.status(404).json({ error: 'Modul tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mendapatkan modul' });
  }
};

const updateModule = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const moduleData = req.body;
    await moduleModel.updateModule(moduleId, moduleData);
    res.status(200).json({ message: 'Modul berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal memperbarui modul' });
  }
};

const deleteModule = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    await moduleModel.deleteModule(moduleId);
    res.status(200).json({ message: 'Modul berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menghapus modul' });
  }
};

module.exports = {
  createModule,
  getAllModules,
  getModuleById,
  updateModule,
  deleteModule,
};
