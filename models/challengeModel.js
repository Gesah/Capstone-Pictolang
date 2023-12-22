const admin = require('firebase-admin');

const createChallenge = async (challengeData) => {
  const challengeRef = await admin.database().ref('challenge').push(challengeData);
  const challengeId = challengeRef.key;
  return challengeId;
};

const getAllChallenges = async () => {
  const challengesSnapshot = await admin.database().ref('challenge').once('value');
  const challengesData = challengesSnapshot.val() || {};
  return Object.keys(challengesData).map((challengeId) => ({ ...challengesData[challengeId], id: challengeId }));
};

const getChallengeById = async (challengeId) => {
  const challengeSnapshot = await admin.database().ref(`challenge/${challengeId}`).once('value');
  return challengeSnapshot.val();
};

const updateChallenge = async (challengeId, challengeData) => {
  await admin.database().ref(`challenge/${challengeId}`).update(challengeData);
};

const deleteChallenge = async (challengeId) => {
  await admin.database().ref(`challenge/${challengeId}`).remove();
};

module.exports = {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
};