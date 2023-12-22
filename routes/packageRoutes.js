/*// packageRoutes.js
const express = require('express');
const router = express.Router();
const { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage } = require('../controllers/packageController');
const { authorization } = require('../middlewares/authentication');

// Routes untuk Package
router.post('/', authorization, createPackage);
router.get('/', getAllPackages);
router.get('/:packageId', getPackageById);
router.put('/:packageId', authorization, updatePackage);
router.delete('/:packageId', authorization, deletePackage);

module.exports = router; */

// packageRoutes.js
const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

router.post('/api/', packageController.createPackage);
router.get('/api/', packageController.getAllPackages);
router.get('/api/:packageId', packageController.getPackageById);
router.put('/api/:packageId', packageController.updatePackage);
router.delete('/api/:packageId', packageController.deletePackage);

module.exports = router;