// challengeRoutes.js
const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');

router.post('/', challengeController.createChallenge);
router.get('/', challengeController.getAllChallenges);
router.get('/:challengeId', challengeController.getChallengeById);
router.put('/:challengeId', challengeController.updateChallenge);
router.delete('/:challengeId', challengeController.deleteChallenge);

module.exports = router;
