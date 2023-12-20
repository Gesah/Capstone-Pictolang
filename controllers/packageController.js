// packageController.js
const packageModel = require('../models/packageModel');

const createPackage = async (req, res) => {
  try {
    const packageData = req.body;
    const packageId = await packageModel.createPackage(packageData);
    res.status(201).json({ message: 'Paket berhasil dibuat', packageId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal membuat paket' });
  }
};

const getAllPackages = async (req, res) => {
  try {
    const packages = await packageModel.getAllPackages();
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mendapatkan paket' });
  }
};

const getPackageById = async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const packageData = await packageModel.getPackageById(packageId);
    if (packageData) {
      res.status(200).json(packageData);
    } else {
      res.status(404).json({ error: 'Paket tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mendapatkan paket' });
  }
};

const updatePackage = async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const packageData = req.body;
    await packageModel.updatePackage(packageId, packageData);
    res.status(200).json({ message: 'Paket berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal memperbarui paket' });
  }
};

const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.packageId;
    await packageModel.deletePackage(packageId);
    res.status(200).json({ message: 'Paket berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menghapus paket' });
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
