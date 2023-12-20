// moduleRoutes.js
const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

router.post('/', moduleController.createModule);
router.get('/', moduleController.getAllModules);
router.get('/:moduleId', moduleController.getModuleById);
router.put('/:moduleId', moduleController.updateModule);
router.delete('/:moduleId', moduleController.deleteModule);

module.exports = router;
