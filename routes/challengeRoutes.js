// challengeRoutes.js
const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');

router.post('/api/', challengeController.createChallenge);
router.get('/api/', challengeController.getAllChallenges);
router.get('/api/:challengeId', challengeController.getChallengeById);
router.put('/api/:challengeId', challengeController.updateChallenge);
router.delete('/api/:challengeId', challengeController.deleteChallenge);


module.exports = router;