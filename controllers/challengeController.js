// challengeController.js
const challengeModel = require('../models/challengeModel');

const createChallenge = async (req, res) => {
  try {
    const challengeData = req.body;
    const challengeId = await challengeModel.createChallenge(challengeData);
    res.status(201).json({ message: 'Challenge berhasil dibuat', challengeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal membuat challenge' });
  }
};

const getAllChallenges = async (req, res) => {
  try {
    const challenges = await challengeModel.getAllChallenges();
    res.status(200).json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mendapatkan challenges' });
  }
};

const getChallengeById = async (req, res) => {
  try {
    const challengeId = req.params.challengeId;
    const challengeData = await challengeModel.getChallengeById(challengeId);
    if (challengeData) {
      res.status(200).json(challengeData);
    } else {
      res.status(404).json({ error: 'Challenge tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mendapatkan challenge' });
  }
};

const updateChallenge = async (req, res) => {
  try {
    const challengeId = req.params.challengeId;
    const challengeData = req.body;
    await challengeModel.updateChallenge(challengeId, challengeData);
    res.status(200).json({ message: 'Challenge berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal memperbarui challenge' });
  }
};

const deleteChallenge = async (req, res) => {
  try {
    const challengeId = req.params.challengeId;
    await challengeModel.deleteChallenge(challengeId);
    res.status(200).json({ message: 'Challenge berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menghapus challenge' });
  }
};

module.exports = {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
};