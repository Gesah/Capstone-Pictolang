/*// moduleRoutes.js
const express = require('express');
const router = express.Router();
const { createModule, getAllModules, getModuleById, updateModule, deleteModule } = require('../controllers/moduleController');
const { authorization } = require('../middlewares/authentication');

// Routes untuk Module
router.post('/', authorization, createModule);
router.get('/', getAllModules);
router.get('/:moduleId', getModuleById);
router.put('/:moduleId', authorization, updateModule);
router.delete('/:moduleId', authorization, deleteModule);

module.exports = router; */

// moduleRoutes.js
const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

router.post('/api/', moduleController.createModule);
router.get('/api/', moduleController.getAllModules);
router.get('/api/:moduleId', moduleController.getModuleById);
router.put('/api/:moduleId', moduleController.updateModule);
router.delete('/api/:moduleId', moduleController.deleteModule);

module.exports = router;
