const admin = require('firebase-admin');

const authorization = (role) => {
  return async (req, res, next) => {
    const { uid } = req.user;

    try {
      const userRecord = await admin.auth().getUser(uid);
      console.log('User Record Custom Claims:', userRecord.customClaims);

      if (userRecord.customClaims && userRecord.customClaims.role === role) {
        next();
      } else {
        res.status(403).json({ error: 'Unauthorized access' });
      }
    } catch (error) {
      console.error('Authorization Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

module.exports = authorization;
