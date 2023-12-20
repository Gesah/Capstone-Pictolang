const express = require('express');
const userRoutes = require('./userRoutes');
const objectRoutes = require('./objectRoutes');
const packageRoutes = require('./packageRoutes');
const challengeRoutes = require('./challengeRoutes');
const moduleRoutes = require('./moduleRoutes');

// Import your models
const models = require('../models');
const userModel = models.userModel;
const objectModel = models.objectModel;
const packageModel = models.packageModel;
const challengeModel = models.challengeModel;
const moduleModel = models.moduleModel;

const router = express.Router();

router.use('/users', userRoutes({ userModel }));
router.use('/objects', objectRoutes({ objectModel }));
router.use('/packages', packageRoutes({ packageModel }));
router.use('/challenges', challengeRoutes({ challengeModel }));
router.use('/modules', moduleRoutes({ moduleModel }));

module.exports = router;
